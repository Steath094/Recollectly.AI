import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../Icons/PlusIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { Sidebar } from "../components/SideBar"

export function Dashboard(){
  const [modalOpen, setModalOpen] = useState(false)

    return <div className="flex">
    <Sidebar/>
    <div className="p-6 flex flex-col gap-4 bg-[#f9fbfc]">
    <div className="flex justify-between">
      <p className="text-2xl font-bold">All Notes</p>
      <div className="flex gap-3">
        <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>} />
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>} onclick={()=>setModalOpen(true)} />
      </div>
    </div>
    {modalOpen && <CreateContentModal setModalOpen={setModalOpen}/>}
    <div className="grid grid-cols-3 gap-4">
    <Card title="FIrst Video" link="https://www.youtube.com/watch?v=Hysrm6MdfCo" type="youtube"/>
    <Card title="First Tweet" link="https://x.com/steath094/status/1904506296520646723" type="twitter"/>
    <Card title="FIrst document" link="https://css4.pub/2015/icelandic/dictionary.pdf" type="document"/>
    <Card title="FIrst Video" link="https://www.youtube.com/watch?v=Hysrm6MdfCo" type="youtube"/>
    <Card title="First Tweet" link="https://x.com/steath094/status/1904506296520646723" type="twitter"/>
    </div>
  </div>
  </div>
}