// @ts-ignore
BigInt.prototype.toJSON = function () {
  const string = this.toString();

  const int = parseInt(string, 10);

  return int ?? string;
};
