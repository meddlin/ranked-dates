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
        <em data-oid="4-3q4vd">{field.state.meta.errors.join(",")}</em>
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
    <div className="w-72 text-pretty" data-oid="rpocxtb">
      {editing ? (
        <div className="flex flex-col justify-between h-72" data-oid="des2xo6">
          <div className="relative" data-oid="4xru2:c">
            {isSaving ? (
              <ProcessingAnimation data-oid="e5dphko" />
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
              data-oid=":rh6ecs"
            >
              <div data-oid="zq4x4x_">
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
                  data-oid="p.9l_v5"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="procdl:">
                        Name:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="6gspwtd"
                      />

                      <FieldInfo field={field} data-oid="hv-jjjj" />
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
                  data-oid="1pzv_4c"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="6cevxgm">
                        Maps Link:
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="h_we.3e"
                      />

                      <FieldInfo field={field} data-oid="usslppe" />
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
                  data-oid="vjqf3dw"
                >
                  {(field) => (
                    <>
                      <label htmlFor={field.name} data-oid="-qanmxx">
                        Notes:
                      </label>
                      <Textarea
                        className="h-72 mb-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        data-oid="8ap5rsp"
                      />

                      <FieldInfo field={field} data-oid="zs-qno-" />
                    </>
                  )}
                </form.Field>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  data-oid="70_.ocg"
                >
                  {([canSubmit, isSubmitting]) => (
                    <div
                      className="flex flex-row justify-between"
                      data-oid="pyhycol"
                    >
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        data-oid=":.fhe:t"
                      >
                        {isSubmitting ? "..." : "Submit"}
                        <Save data-oid="i97kpwt" />
                      </Button>
                      <Button
                        type="reset"
                        onClick={() => form.reset()}
                        data-oid="qkuxal0"
                      >
                        Reset
                      </Button>
                      <Button
                        className="bg-gray-200 text-gray-900"
                        onClick={() => setEditing(!editing)}
                        data-oid="i8hwpj-"
                      >
                        <PencilOff data-oid="es4k-pc" />
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-72" data-oid="6t51e04">
          <div className="flex flex-row justify-between" data-oid="--k5gwr">
            {props.notesContent}
            <Button
              className=""
              onClick={() => setEditing(!editing)}
              data-oid="29fp:00"
            >
              <Pencil data-oid="f3q3ncg" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
