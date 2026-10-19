export default function SectionHeading({ index, id, title, description }) {
  return (
    <div className="mb-10 border-t border-rule pt-6 md:mb-14">
      <div className="grid gap-x-8 gap-y-4 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow">
            {index} — {id}
          </p>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-3 max-w-2xl text-[0.95rem] text-muted">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
