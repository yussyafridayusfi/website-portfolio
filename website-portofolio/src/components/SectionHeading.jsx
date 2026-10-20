export default function SectionHeading({ index, id, title, description }) {
  return (
    <div className="mb-7 border-t border-rule pt-5 md:mb-9">
      <div className="grid gap-x-8 gap-y-2 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow">
            {index} — {id}
          </p>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
