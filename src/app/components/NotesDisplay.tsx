export default function NotesDisplay(props: { notesContent: string }) {

    return (
        <div className="pt-16 w-72 text-pretty">
            {props.notesContent}
        </div>
    );
}