import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Save, Pencil, PencilOff } from 'lucide-react'
import ProcessingAnimation from './ProcessingAnimation';
import { useForm } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(',')}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export default function NotesDisplay(props: { notesContent: string }) {
    const [editing, setEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm({
        defaultValues: {
            name: '',
            mapsLink: '',
            notes: ''
        },
        onSubmit: async ({ value }) => {
            /**
             * Network calls should happen here
             */

            // Do something with form data
            // console.log(value)
            console.log(JSON.stringify(value))

            /**
             * Remember to "clean up" any sort of UI state or loading animations
             */
            setTimeout(() => { setEditing(!editing) }, 1050)
        },
    })

    return (
        <div className="w-72 text-pretty">

            {editing ? (
                <div className="flex flex-col justify-between h-72">
                    <div className="relative">
                        {isSaving ? (
                            <ProcessingAnimation />
                            // <div className="absolute inset-0 bg-gray-500 bg-opacity-50 text-white flex items-center justify-center pointer-events-none text-lg">
                            //     <ProcessingAnimation />
                            // </div>
                        ) : ('')}

                        <form
                            onSubmit={(event) => {
                                /**
                                 * Beginning of form submission happens here
                                 * - this is a good place to trigger long-running UI visualizations
                                 */
                                event.preventDefault()
                                event.stopPropagation()

                                setIsSaving(!isSaving)
                                setTimeout(() => { setIsSaving(false) }, 3000)
                                // setTimeout(() => { setEditing(!editing) }, 1050)

                                form.handleSubmit()
                            }}
                        >
                            <div>
                                <form.Field
                                    name="name"
                                    validators={{
                                        onChange: ({ value }) => !value
                                            ? 'A name is required'
                                            : value.length < 3
                                                ? 'Name must be at least 3 characters'
                                                : undefined,
                                        onChangeAsyncDebounceMs: 500,
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 1000))
                                            return (
                                                value.includes('error') && 'No "error" allowed in first name'
                                            )
                                        },
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <label htmlFor={field.name}>Name:</label>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )
                                    }}
                                />
                                <form.Field
                                    name="mapsLink"
                                    validators={{
                                        onChange: ({ value }) => !value ? 'A maps link is required' : undefined,
                                        onChangeAsyncDebounceMs: 500,
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 1000))
                                            return (
                                                value.includes('error') && 'No "error" allowed in maps link.'
                                            )
                                        },
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <label htmlFor={field.name}>Maps Link:</label>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )
                                    }}
                                />
                                <form.Field
                                    name="notes"
                                    validators={{
                                        onChange: ({ value }) => !value ? 'Notes are required' : undefined,
                                        onChangeAsyncDebounceMs: 500,
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 1000))
                                            return (
                                                value.includes('error') && 'No "error" allowed on the notes.'
                                            )
                                        },
                                    }}
                                    children={(field) => {
                                        return (
                                            <>
                                                <label htmlFor={field.name}>Notes:</label>
                                                <Textarea
                                                    className="h-72 mb-4"
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )
                                    }}
                                />
                                <form.Subscribe
                                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                                    children={([canSubmit, isSubmitting]) => (
                                        <div className="flex flex-row justify-between">
                                            <Button type="submit" disabled={!canSubmit}>
                                                {isSubmitting ? '...' : 'Submit'}
                                                <Save />
                                            </Button>
                                            <Button type="reset" onClick={() => form.reset()}>
                                                Reset
                                            </Button>
                                            <Button
                                                className="bg-gray-200 text-gray-900"
                                                onClick={() => setEditing(!editing)}>
                                                <PencilOff />
                                            </Button>
                                        </div>
                                    )}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-row justify-between ml-2">
                        {/* <Button
                            type="submit"
                            onClick={
                                () => {
                                    setIsSaving(!isSaving)
                                    setTimeout(() => { setIsSaving(false) }, 1000)
                                    setTimeout(() => { setEditing(!editing) }, 1050)
                                }
                            }
                        >
                            <Save />
                        </Button> */}

                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-between h-72">
                    <div className="flex flex-row justify-between">
                        {props.notesContent}
                        <Button
                            className=""
                            onClick={() => setEditing(!editing)}>
                            <Pencil />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}