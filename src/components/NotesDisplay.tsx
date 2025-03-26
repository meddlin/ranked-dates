import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import { Save, Pencil, PencilOff } from 'lucide-react'
import ProcessingAnimation from './ProcessingAnimation';

export default function NotesDisplay(props: { notesContent: string }) {
    const [editing, setEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    return (
        <div className="pt-16 w-72 text-pretty">

            {editing ? (
                <div className="flex flex-row justify-between h-72">
                    <div className="relative">
                        {isSaving ? (
                            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 text-white flex items-center justify-center pointer-events-none text-lg">
                                <ProcessingAnimation />
                            </div>
                        ) : ('')}
                        <Textarea
                            className="h-72 mb-4"
                            placeholder="Add your notes here"
                            value={props.notesContent}
                            onChange={() => console.log('notes textarea onChange')}
                            disabled={isSaving ? true : false}
                        />
                    </div>

                    <div className="flex flex-col justify-start space-y-4 ml-2">
                        <Button
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
                        </Button>
                        <Button
                            className="bg-gray-200 text-gray-900"
                            onClick={() => setEditing(!editing)}>
                            <PencilOff />
                        </Button>
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