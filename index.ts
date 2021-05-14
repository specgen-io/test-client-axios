/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as t from './io-ts'


export const TMessage = t.interface({
    int_field: t.number,
    string_field: t.string,
})

export type Message = t.TypeOf<typeof TMessage>

export enum Choice {
    FIRST_CHOICE = "FIRST_CHOICE",
    SECOND_CHOICE = "SECOND_CHOICE",
    THIRD_CHOICE = "THIRD_CHOICE",
}

export const TChoice = t.enum(Choice)

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { decode, encode } from './codec'

export const echoClient = (axiosInstance: AxiosInstance) => {
    return {
        axiosInstance,

        echoBody: async (parameters: {body: Message}): Promise<EchoBodyResponse> => {
            const config: AxiosRequestConfig = {}
            const bodyJson = encode(TMessage, parameters.body)
            const response = await axiosInstance.post(`/echo/body`, bodyJson, config)
            switch (response.status) {
                case 200:
                    return Promise.resolve({ status: "ok", data: decode(TMessage, response.data) })
                default:
                    throw new Error(`Unexpected status code ${ response.status }`)
            }
        },

        echoQuery: async (parameters: {intQuery: number, stringQuery: string}): Promise<EchoQueryResponse> => {
            const params = {
                "int_query": parameters.intQuery,
                "string_query": parameters.stringQuery,
            }
            const config: AxiosRequestConfig = {params: params,}
            const response = await axiosInstance.get(`/echo/query`, config)
            switch (response.status) {
                case 200:
                    return Promise.resolve({ status: "ok", data: decode(TMessage, response.data) })
                default:
                    throw new Error(`Unexpected status code ${ response.status }`)
            }
        },

        echoHeader: async (parameters: {intHeader: number, stringHeader: string}): Promise<EchoHeaderResponse> => {
            const headers = {
                "Int-Header": parameters.intHeader,
                "String-Header": parameters.stringHeader,
            }
            const config: AxiosRequestConfig = {headers: headers,}
            const response = await axiosInstance.get(`/echo/header`, config)
            switch (response.status) {
                case 200:
                    return Promise.resolve({ status: "ok", data: decode(TMessage, response.data) })
                default:
                    throw new Error(`Unexpected status code ${ response.status }`)
            }
        },

        echoUrlParams: async (parameters: {intUrl: number, stringUrl: string}): Promise<EchoUrlParamsResponse> => {
            const config: AxiosRequestConfig = {}
            const response = await axiosInstance.get(`/echo/url_params/${parameters.intUrl}/${parameters.stringUrl}`, config)
            switch (response.status) {
                case 200:
                    return Promise.resolve({ status: "ok", data: decode(TMessage, response.data) })
                default:
                    throw new Error(`Unexpected status code ${ response.status }`)
            }
        },
    }
}

export type EchoBodyResponse =
    | { status: "ok", data: Message }

export type EchoQueryResponse =
    | { status: "ok", data: Message }

export type EchoHeaderResponse =
    | { status: "ok", data: Message }

export type EchoUrlParamsResponse =
    | { status: "ok", data: Message }

export const checkClient = (axiosInstance: AxiosInstance) => {
    return {
        axiosInstance,

        checkQuery: async (parameters: {pString: string, pStringArray: string[], pDate: string, pDateArray: string[], pDatetime: string, pInt: number, pLong: number, pDecimal: number, pEnum: Choice, pStringOpt?: string | null, pStringDefaulted?: string | null}): Promise<CheckQueryResponse> => {
            const params = {
                "p_string": parameters.pString,
                "p_string_opt": parameters.pStringOpt,
                "p_string_array": parameters.pStringArray,
                "p_date": parameters.pDate,
                "p_date_array": parameters.pDateArray,
                "p_datetime": parameters.pDatetime,
                "p_int": parameters.pInt,
                "p_long": parameters.pLong,
                "p_decimal": parameters.pDecimal,
                "p_enum": parameters.pEnum,
                "p_string_defaulted": parameters.pStringDefaulted,
            }
            const config: AxiosRequestConfig = {params: params,}
            const response = await axiosInstance.get(`/check/query`, config)
            switch (response.status) {
                case 200:
                    return Promise.resolve({ status: "ok" })
                default:
                    throw new Error(`Unexpected status code ${ response.status }`)
            }
        },

        checkForbidden: async (): Promise<CheckForbiddenResponse> => {
            const config: AxiosRequestConfig = {}
            const response = await axiosInstance.get(`/check/forbidden`, config)
            switch (response.status) {
                case 403:
                    return Promise.resolve({ status: "forbidden" })
                default:
                    throw new Error(`Unexpected status code ${ response.status }`)
            }
        },
    }
}

export type CheckQueryResponse =
    | { status: "ok" }

export type CheckForbiddenResponse =
    | { status: "forbidden" }

export { Errors } from 'io-ts'
export { DecodeError } from './codec'
