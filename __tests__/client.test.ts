import {echoClient, checkClient, Message, Choice, EchoQueryResponse} from '../index'
import axios from "axios";

const axiosInstance = axios.create({baseURL: process.env.SERVICE_URL!, timeout: 20000});

describe('client echo', function() {
    let client = echoClient(axiosInstance)
    it('echoBody', async function() {
        let body: Message = {int_field: 123, string_field: "the string"}
        let response = await client.echoBody({body})
        expect(response.data).toStrictEqual(body);
    })

    it('echoQuery', async function() {
        let expected: Message = {int_field: 123, string_field: "the string"}
        let response = await client.echoQuery({intQuery: 123, stringQuery: "the string"})
        expect(response.data).toStrictEqual(expected);
    })

    it('echoHeader', async function() {
        let expected: Message = {int_field: 123, string_field: "the string"}
        let response = await client.echoHeader({intHeader: 123, stringHeader: "the string"})
        expect(response.data).toStrictEqual(expected);
    })

    it('echoUrlParams', async function() {
        let expected: Message = {int_field: 123, string_field: "the string"}
        let response = await client.echoUrlParams({intUrl: 123, stringUrl: "the string"})
        expect(response.data).toStrictEqual(expected);
    })
});

describe('client check', function() {
    let client = checkClient(axiosInstance)
    it('checkQuery', async function() {
        let body: Message = {int_field: 123, string_field: "the string"}
        let response = await client.checkQuery({
            pString: "the string",
            pStringArray: ["string 1", "string 2"],
            pDate: "2021-01-01",
            pDateArray: ["2021-01-02"],
            pDatetime: new Date("2021-01-02T23:54"),
            pInt: 123,
            pLong: 123,
            pDecimal: 123,
            pEnum: Choice.SECOND_CHOICE,
            pStringOpt: "some string",
            pStringDefaulted: "the string",
        })
        expect(response).toStrictEqual({status: "ok"});
    })
});