const compose = (...funcs) => component => {
  return funcs.reduceRight((prevResult, f) => f(prevResult), component);
};

export default compose;
