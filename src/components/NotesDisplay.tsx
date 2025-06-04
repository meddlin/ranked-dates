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
        <em data-oid="r2z1is7">{field.state.meta.errors.join(",")}</em>
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
    <div className="w-72 text-pretty" data-oid="kz0ep4e">
      {editing ? (
        <div className="flex flex-col justify-between h-72" data-oid="y0:an00">
          <div className="relative" data-oid="z2d1g-a">
            {isSaving ? (
              <ProcessingAnimation data-oid="rzq616u" />
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
              data-oid="mn3j1zf"
            >
              <div data-oid="u4sq:_z">
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
                  data-oid="o3ms77w"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="6-zl7ei">
                        Name:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="n5dztwt"
                      />

                      <FieldInfo field={field} data-oid="uc3t65." />
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
                  data-oid="4p90xcp"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="u_spnaa">
                        Maps Link:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="rl:pz-f"
                      />

                      <FieldInfo field={field} data-oid="7yptru." />
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
                  data-oid="a.cw2-3"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="l.z1n6e">
                        Notes:
                      </label>
                      <Textarea
                        className="h-72 mb-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="tnd7v1z"
                      />

                      <FieldInfo field={field} data-oid="c_r.ph." />
                    </>
                  )}
                </form.Field>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  data-oid="d359x07"
                >
                  {([canSubmit, isSubmitting]) => (
                    <div
                      className="flex flex-row justify-between"
                      data-oid="9kgrfnv"
                    >
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        data-oid="1n:qbt7"
                      >
                        {isSubmitting ? "..." : "Submit"}
                        <Save data-oid="o_bf3if" />
                      </Button>
                      <Button
                        type="reset"
                        onClick={() => form.reset()}
                        data-oid="j.wpu9_"
                      >
                        Reset
                      </Button>
                      <Button
                        className="bg-gray-200 text-gray-900"
                        onClick={() => setEditing(!editing)}
                        data-oid="9_-abfs"
                      >
                        <PencilOff data-oid=":kv8l0c" />
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-72" data-oid="f.l5fml">
          <div className="flex flex-row justify-between" data-oid="7e5h6jw">
            {props.notesContent}
            <Button
              className=""
              onClick={() => setEditing(!editing)}
              data-oid="sudo9j1"
            >
              <Pencil data-oid="uyo3icg" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
