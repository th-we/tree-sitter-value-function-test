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

    _parens_value_content: $ => seq(
      token.immediate('('),
      repeat1(choice(
        token.immediate(/[^"{]/),
        token.immediate('""')
      ))
    ),

    _non_parens_value_content: $ => seq(
      token.immediate(/[^(]/),
      optional($._value_content)
    ),

    value: $ => seq(
      token('"'),
      optional(choice($._parens_value_content, $._non_parens_value_content)),
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
