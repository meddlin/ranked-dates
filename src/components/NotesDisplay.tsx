import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Pencil, PencilOff } from "lucide-react";
import ProcessingAnimation from "./ProcessingAnimation";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em data-oid="x2ncxar">{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function NotesDisplay(props: { notesContent: string }) {
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      mapsLink: "",
      notes: "",
    },
    onSubmit: async ({ value }) => {
      /**
       * Network calls should happen here
       */

      // Do something with form data
      console.log(JSON.stringify(value));

      /**
       * Remember to "clean up" any sort of UI state or loading animations
       */
      setTimeout(() => {
        setEditing(!editing);
      }, 1050);
    },
  });

  return (
    <div className="w-72 text-pretty" data-oid="u.d6pnd">
      {editing ? (
        <div className="flex flex-col justify-between h-72" data-oid="b2-lsz-">
          <div className="relative" data-oid="f6v2jck">
            {isSaving ? (
              <ProcessingAnimation data-oid="bw8n57s" />
            ) : (
              // <div className="absolute inset-0 bg-gray-500 bg-opacity-50 text-white flex items-center justify-center pointer-events-none text-lg">
              //     <ProcessingAnimation />
              // </div>
              ""
            )}

            <form
              onSubmit={(event) => {
                /**
                 * Beginning of form submission happens here
                 * - this is a good place to trigger long-running UI visualizations
                 */
                event.preventDefault();
                event.stopPropagation();

                setIsSaving(!isSaving);
                setTimeout(() => {
                  setIsSaving(false);
                }, 3000);
                // setTimeout(() => { setEditing(!editing) }, 1050)

                form.handleSubmit();
              }}
              data-oid="783_8.t"
            >
              <div data-oid="mf9ft:1">
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "A name is required"
                        : value.length < 3
                          ? "Name must be at least 3 characters"
                          : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      return (
                        value.includes("error") &&
                        'No "error" allowed in first name'
                      );
                    },
                  }}
                  data-oid="i6:mrx0"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="6nve:vf">
                        Name:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="zwbl9.h"
                      />

                      <FieldInfo field={field} data-oid="626hbrp" />
                    </>
                  )}
                </form.Field>
                <form.Field
                  name="mapsLink"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "A maps link is required" : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      return (
                        value.includes("error") &&
                        'No "error" allowed in maps link.'
                      );
                    },
                  }}
                  data-oid="nzl:.e0"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="3sa2fol">
                        Maps Link:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="z.5h6ee"
                      />

                      <FieldInfo field={field} data-oid="g9f:n9g" />
                    </>
                  )}
                </form.Field>

                <form.Field
                  name="notes"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "Notes are required" : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      return (
                        value.includes("error") &&
                        'No "error" allowed on the notes.'
                      );
                    },
                  }}
                  data-oid="8wqywxw"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="xaqij82">
                        Notes:
                      </label>
                      <Textarea
                        className="h-72 mb-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid=":8i291f"
                      />

                      <FieldInfo field={field} data-oid="p:oink5" />
                    </>
                  )}
                </form.Field>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  data-oid="w9867fn"
                >
                  {([canSubmit, isSubmitting]) => (
                    <div
                      className="flex flex-row justify-between"
                      data-oid="9lejgcx"
                    >
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        data-oid="g8lh1wt"
                      >
                        {isSubmitting ? "..." : "Submit"}
                        <Save data-oid="y3597id" />
                      </Button>
                      <Button
                        type="reset"
                        onClick={() => form.reset()}
                        data-oid="wzqtm5t"
                      >
                        Reset
                      </Button>
                      <Button
                        className="bg-gray-200 text-gray-900"
                        onClick={() => setEditing(!editing)}
                        data-oid="f_z-v4."
                      >
                        <PencilOff data-oid="mw-95v:" />
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-72" data-oid="glw97se">
          <div className="flex flex-row justify-between" data-oid="7m03t56">
            {props.notesContent}
            <Button
              className=""
              onClick={() => setEditing(!editing)}
              data-oid="sjdai54"
            >
              <Pencil data-oid="s9j1y:8" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
