function QuickSummary() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4" id="quick-summary">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </div>
  )
}

export default QuickSummary
