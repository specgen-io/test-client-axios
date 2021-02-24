import {Either, left, right, mapLeft} from 'fp-ts/Either';
import * as t from '../io-ts';
import { decode, encode } from '../codec';
import {
  Choice,
  EnumFields,
  TEnumFields,
  Parent,
  TParent,
  Nested,
  NumericFields,
  TNumericFields,
  NonNumericFields,
  TNonNumericFields,
  ArrayFields,
  TArrayFields,
  MapFields,
  TMapFields,
  OptionalFields,
  TOptionalFields,
  OrderEvent,
  TOrderEvent
} from '../models';

describe('enum fields', function() {
  let decoded: EnumFields = {enum_field: Choice.THIRD_CHOICE}
  let encoded = {'enum_field': 'THIRD_CHOICE'}
  it('encode', function() {
    expect(encode(TEnumFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TEnumFields, encoded)).toStrictEqual(decoded);
  })
  it('decode fail', function() {
    expect(() => decode(TEnumFields, {})).toThrowError('Decoding failed')
  })
});

describe('nested types', function() {
  let decoded: Parent = {
    'field': 'the string',
    'nested': {'field': "the nested string"}
  }
  let encoded = {
    'field': 'the string',
    'nested': {'field': "the nested string"}
  }
  it('encode', function() {
    expect(encode(TParent, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TParent, encoded)).toStrictEqual(decoded);
  })
  it('decode fail', function() {
    expect(() => decode(TParent, {})).toThrowError('Decoding failed');
  })
});

describe('numeric fields', function() {
  let decoded: NumericFields = {
    byte_field: 123,
    short_field: 123,
    int_field: 123,
    long_field: 123,
    float_field: 12.3,
    double_field: 12.3,
    decimal_field: 12.3,
  }
  let encoded = {
    byte_field: 123,
    short_field: 123,
    int_field: 123,
    long_field: 123,
    float_field: 12.3,
    double_field: 12.3,
    decimal_field: 12.3,
  }
  it('encode', function() {
    expect(encode(TNumericFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TNumericFields, encoded)).toStrictEqual(decoded);
  })
  it('decode fail', function() {
    expect(() => decode(TNumericFields, {})).toThrowError('Decoding failed');

  })
});

describe('non numeric fields', function() {
  let decoded: NonNumericFields = {
    boolean_field: true,
    char_field: 'c',
    string_field: 'some string',
    uuid_field: '123e4567-e89b-12d3-a456-426655440000',
    date_field: '2021-01-01',
    datetime_field: '2021-01-02T23:54',
    time_field: '23:54',
  }
  let encoded = {
    boolean_field: true,
    char_field: 'c',
    string_field: 'some string',
    uuid_field: '123e4567-e89b-12d3-a456-426655440000',
    date_field: '2021-01-01',
    datetime_field: '2021-01-02T23:54',
    time_field: '23:54',
  }
  it('encode', function() {
    expect(encode(TNonNumericFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TNonNumericFields, encoded)).toStrictEqual(decoded);
  })
});

describe('array fields', function() {
  let decoded: ArrayFields = {
    int_array_field: [1, 2, 3],
    string_array_field: ['one', 'two', 'three'],
  }
  let encoded = {
    int_array_field: [1, 2, 3],
    string_array_field: ['one', 'two', 'three'],
  }
  it('encode', function() {
    expect(encode(TArrayFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TArrayFields, encoded)).toStrictEqual(decoded);
  })
});

describe('map fields', function() {
  let decoded: MapFields = {
    int_map_field: {'one': 1, 'two': 2, 'three': 3},
    string_map_field: {'one': 'first', 'two': 'second', 'three': 'third'},
  }
  let encoded = {
    int_map_field: {'one': 1, 'two': 2, 'three': 3},
    string_map_field: {'one': 'first', 'two': 'second', 'three': 'third'},
  }
  it('encode', function() {
    expect(encode(TMapFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TMapFields, encoded)).toStrictEqual(decoded);
  })
});

describe('optional fields', function() {
  let decoded: OptionalFields = {
    int_option_field: 123,
    string_option_field: 'the string',
  }
  let encoded = {
    int_option_field: 123,
    string_option_field: 'the string',
  }
  it('encode', function() {
    expect(encode(TOptionalFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TOptionalFields, encoded)).toStrictEqual(decoded);
  })
});

describe('optional fields null', function() {
  let decoded: OptionalFields = {
    int_option_field: null,
    string_option_field: null,
  }
  let encoded = {
    int_option_field: null,
    string_option_field: null,
  }
  it('encode', function() {
    expect(encode(TOptionalFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TOptionalFields, encoded)).toStrictEqual(decoded);
  })
});

describe('optional fields missing', function() {
  let decoded: OptionalFields = {}
  let encoded = {}
  it('encode', function() {
    expect(encode(TOptionalFields, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TOptionalFields, encoded)).toStrictEqual(decoded);
  })
});

describe('oneof types', function() {
  let decoded: OrderEvent = { changed: { id: 'id123', quantity: 123 } }
  let encoded = { changed: {id: 'id123', quantity: 123} }
  it('encode', function() {
    expect(encode(TOrderEvent, decoded)).toStrictEqual(encoded);
  })
  it('decode', function() {
    expect(decode(TOrderEvent, encoded)).toStrictEqual(decoded);
  })
  it('decode breaks', function() {
    expect(() => decode(TOrderEvent, { created: {} })).toThrowError('Decoding failed');
  })
});