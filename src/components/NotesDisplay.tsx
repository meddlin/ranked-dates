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
        <em data-oid="1u9.obi">{field.state.meta.errors.join(",")}</em>
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
    <div className="w-72 text-pretty" data-oid="xcbcev5">
      {editing ? (
        <div className="flex flex-col justify-between h-72" data-oid="c8c:ql6">
          <div className="relative" data-oid="cpe1pdd">
            {isSaving ? (
              <ProcessingAnimation data-oid="acasy.b" />
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
              data-oid="gwm9llm"
            >
              <div data-oid="d6r-qq6">
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
                  data-oid="qdmbhi4"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="u50ykre">
                        Name:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="afn3fv7"
                      />

                      <FieldInfo field={field} data-oid="jc:cuvf" />
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
                  data-oid="pshbmmr"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="9-s-y.i">
                        Maps Link:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="u9k88qn"
                      />

                      <FieldInfo field={field} data-oid="y_uenya" />
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
                  data-oid="hdh8cp."
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="h90e5tu">
                        Notes:
                      </label>
                      <Textarea
                        className="h-72 mb-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="r6apfmc"
                      />

                      <FieldInfo field={field} data-oid="g3ubjcl" />
                    </>
                  )}
                </form.Field>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  data-oid="lyi6k15"
                >
                  {([canSubmit, isSubmitting]) => (
                    <div
                      className="flex flex-row justify-between"
                      data-oid="9b-:1.e"
                    >
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        data-oid="qpdr5nn"
                      >
                        {isSubmitting ? "..." : "Submit"}
                        <Save data-oid="_kq4we6" />
                      </Button>
                      <Button
                        type="reset"
                        onClick={() => form.reset()}
                        data-oid=":17oyhp"
                      >
                        Reset
                      </Button>
                      <Button
                        className="bg-gray-200 text-gray-900"
                        onClick={() => setEditing(!editing)}
                        data-oid="wp:uqwe"
                      >
                        <PencilOff data-oid="5cvzdu2" />
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-72" data-oid="bl4g-b5">
          <div className="flex flex-row justify-between" data-oid="kz83atc">
            {props.notesContent}
            <Button
              className=""
              onClick={() => setEditing(!editing)}
              data-oid="nj2enng"
            >
              <Pencil data-oid="3i_up97" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
