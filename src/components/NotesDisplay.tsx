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
        <em data-oid="371.z9p">{field.state.meta.errors.join(",")}</em>
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
    <div className="w-72 text-pretty" data-oid="xbx4b85">
      {editing ? (
        <div className="flex flex-col justify-between h-72" data-oid="5wqh-ce">
          <div className="relative" data-oid="34vldlf">
            {isSaving ? (
              <ProcessingAnimation data-oid="93xb2y." />
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
              data-oid="uyrxl56"
            >
              <div data-oid="izd_-5x">
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
                  data-oid="q0olrne"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="6b8al6l">
                        Name:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="suicznv"
                      />

                      <FieldInfo field={field} data-oid="qlrrjgk" />
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
                  data-oid=".svm10d"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="1g_.wjl">
                        Maps Link:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="8slp0w5"
                      />

                      <FieldInfo field={field} data-oid="9wt.hyh" />
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
                  data-oid="27q7:nc"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="1398tyb">
                        Notes:
                      </label>
                      <Textarea
                        className="h-72 mb-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="wwhus47"
                      />

                      <FieldInfo field={field} data-oid="uk9x27b" />
                    </>
                  )}
                </form.Field>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  data-oid=".ptiq3u"
                >
                  {([canSubmit, isSubmitting]) => (
                    <div
                      className="flex flex-row justify-between"
                      data-oid="78w4oqf"
                    >
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        data-oid="67tm8x5"
                      >
                        {isSubmitting ? "..." : "Submit"}
                        <Save data-oid="3ktn_or" />
                      </Button>
                      <Button
                        type="reset"
                        onClick={() => form.reset()}
                        data-oid="bg_wf_w"
                      >
                        Reset
                      </Button>
                      <Button
                        className="bg-gray-200 text-gray-900"
                        onClick={() => setEditing(!editing)}
                        data-oid="ni9l6ft"
                      >
                        <PencilOff data-oid="dulm52l" />
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-72" data-oid="l44u5o5">
          <div className="flex flex-row justify-between" data-oid="7v:6_mm">
            {props.notesContent}
            <Button
              className=""
              onClick={() => setEditing(!editing)}
              data-oid="0te.en3"
            >
              <Pencil data-oid="5jf2:a8" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
