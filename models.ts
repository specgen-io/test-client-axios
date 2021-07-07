import * as t from './superstruct'

export const TMessage = t.object({
    int_field: t.number(),
    string_field: t.string(),
})

export type Message = t.Infer<typeof TMessage>

export const TChoice = t.enums ([
    "FIRST_CHOICE",
    "SECOND_CHOICE",
    "THIRD_CHOICE",
])

export type Choice = t.Infer<typeof TChoice>

export const Choice = {
    FIRST_CHOICE: <Choice>"FIRST_CHOICE",
    SECOND_CHOICE: <Choice>"SECOND_CHOICE",
    THIRD_CHOICE: <Choice>"THIRD_CHOICE",
}
