import { Types } from "../lib";

describe("hybrid", () => {

    it('should have correct value', () => {
        const obj = {
            a: 1,
            b: 'fuiejfiej',
            c: [
                "1",
                "2",
                "3"
            ],
            d: {
                e: [ "true", "false" ],
                f: [{
                    h: 20.5,
                    i: "45.8"
                }],
                j: "2022-01-01"
            }
        };

        const obj2 = {
            ...obj,
            k: "extra key"
        };

        const result = Types.sanitize(obj2, {
            type: 'object',
            schema: {
                a: {
                    type: 'integer'
                },
                b: {
                    type: 'string'
                },
                c: {
                    type: 'array',
                    elementSchema: {
                        type: 'integer'
                    }
                },
                d: {
                    type: 'object',
                    schema: {
                        e: {
                            type: 'array',
                            elementSchema: {
                                type: 'boolean'
                            }
                        },
                        f: {
                            type: 'array',
                            elementSchema: {
                                type: 'object',
                                schema: {
                                    h: {
                                        type: 'number'
                                    },
                                    i: {
                                        type: 'float'
                                    }
                                }
                            }
                        },
                        j: {
                            type: 'date'
                        }
                    }
                }
            }
        });

        result.should.eql({
            a: 1,
            b: 'fuiejfiej',
            c: [
                1, 2, 3
            ],
            d: {
                e: [ true, false ],
                f: [{
                    h: 20.5,
                    i: 45.8
                }],
                j: new Date("2022-01-01T00:00:00.000Z")
            }
        });
    })
});