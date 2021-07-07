import * as t from './superstruct'

export const TMessage = t.object({
    bool_field: t.boolean(),
    string_field: t.string(),
})

export type Message = t.Infer<typeof TMessage>
