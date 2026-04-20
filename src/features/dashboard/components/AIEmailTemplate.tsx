import { createEmailOutput } from "../utils/ollama";

export function AIEmailTemplate(data: createEmailOutput) {
  return (
    <div>
      <p>{data.contents.greeting}</p>
      <p>{data.contents.body}</p>
      <p>{data.contents.closing}</p>

      {data.attachments && (
        <div>
          <p className="text-sm">Scanned by email:</p>
          <div className="flex gap-2">
            {data.attachments.map((attachment) => (
              <p className="text-blue-500 underline">{attachment}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
