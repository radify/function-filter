import filter from '../src/function-filter';

describe('function-filter', () => {
  var actual, filtered;

  beforeEach(() => {
    actual   = jasmine.createSpy('actualFn').and.returnValue('actualFn return value');
    filtered = filter(actual);
  });

  it('calls `actualFn` with chain, then original parameters', () => {
    filtered('foo', 'bar', 'baz');
    expect(actual).toHaveBeenCalledWith(jasmine.any(Object), 'foo', 'bar', 'baz');
  });

  it('returns value from `actualFn`', () => {
    var result = filtered();
    expect(result).toBe('actualFn return value');
  });

  it('has a fluent interface', () =>{
    expect(filtered.addFilter()).toBe(filtered);
  });

  describe('when `chain.next()` is called with different parameters', () => {
    beforeEach(() => {
      filtered.addFilter((chain, foo, bar, baz) => {
        return chain.next(chain, 'one', 'two', 'three');
      });
    });

    it('calls `actualFn` with those parameters', () => {
      filtered();
      expect(actual).toHaveBeenCalledWith(jasmine.any(Object), 'one', 'two', 'three');
    });

    it('returns value from `actualFn`', () => {
      var result = filtered();
      expect(result).toBe('actualFn return value');
    });
  });

  describe('when result of `chain.next()` is modified', () =>{
    beforeEach(() => {
      filtered.addFilter((chain, ...params) => {
        return chain.next(chain, ...params) + ' after filter';
      });
    });

    it('returns value from `filterFn`', () => {
      var result = filtered();
      expect(result).toBe('actualFn return value after filter');
    });
  });

  describe('when `chain.next()` is not called in a filter', () =>{
    var pass1, pass2;

    beforeEach(() => {
      var block = (chain, ...params) => 'return early';
      var pass  = (chain, ...params) => chain.next(chain, ...params);

      pass1 = jasmine.createSpy('pass1').and.callFake(pass);
      pass2 = jasmine.createSpy('pass2').and.callFake(pass);

      filtered
        .addFilter(pass1)
        .addFilter(block)
        .addFilter(pass2);
    });

    it('does not call trailing functions', () => {
      var result = filtered();
      expect(result).toBe('return early');

      expect(pass1).not.toHaveBeenCalled();
      expect(pass2).toHaveBeenCalled();
    });
  });
});
