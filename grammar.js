module.exports = grammar({
  name: 'value_tests',

  extras: $ => [
    /\s/
  ],

  rules: {
    data: $ => seq(
      repeat(choice($.value, $._quoted_function))
    ),

    _value_content: $ => repeat1(choice(
      token.immediate(/[^"]/),
      token.immediate('""')
    )),

    value: $ => seq(
      token('"'),
      optional($._value_content),
      token.immediate('"')
    ),

    _quoted_function: $ => seq(token('"'), $.function, token.immediate('"')),
    function: $ => seq(
      token.immediate('('),
      optional($._value_content),
      token.immediate('{'),
      optional($._value_content),
    )
  }
});
