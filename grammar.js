module.exports = grammar({
  name: 'value_tests',

  extras: $ => [
    /\s/
  ],

  conflicts: $ => [[$._quoted_function, $.value]],

  rules: {
    data: $ => seq(
      repeat(choice($.value, $._quoted_function))
    ),

    _value_content: $ => repeat1(choice(
      token.immediate(/[^"]/),
      token.immediate('""')
    )),

    // "value" must include quotes because there can be empty values which would
    // otherwise disappear from the tree
    value: $ => prec.dynamic(0, seq(
      token('"'),
      optional($._value_content),
      token.immediate('"')
    )),

    // "function" must not contain quotes because it is the insertion point for
    // another grammar
    _quoted_function: $ => prec.dynamic(1, seq(
      token('"'), $.function, token.immediate('"')
    )),

    // The host application treats all values starting with "(" and containing
    // "{" as a function
    function: $ => seq(
      token.immediate('('),
      optional($._value_content),
      token.immediate('{'),
      optional($._value_content),
    )
  }
});
