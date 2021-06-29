import * as t from './superstruct'

export const TMessage = t.object({
    bool_field: t.boolean(),
    string_field: t.string(),
})

export type Message = t.Infer<typeof TMessage>

import { AxiosInstance, AxiosRequestConfig } from 'axios'

export const echoClient = (axiosInstance: AxiosInstance) => {
    return {
        axiosInstance,

        echoBody: async (parameters: {body: Message}): Promise<EchoBodyResponse> => {
            const config: AxiosRequestConfig = {}
            const bodyJson = t.encode(TMessage, parameters.body)
            const response = await axiosInstance.post(`/echo/body`, bodyJson, config)
            switch (response.status) {
                case 200:
                    return Promise.resolve({ status: "ok", data: t.decode(TMessage, response.data) })
                default:
                    throw new Error(`Unexpected status code ${ response.status }`)
            }
        },
    }
}

export type EchoBodyResponse =
    | { status: "ok", data: Message }
