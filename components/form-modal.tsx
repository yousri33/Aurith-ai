"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] w-[95vw] h-[85vh] p-0 overflow-hidden border-0 bg-white/95 glass backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
        <div className="w-full h-full relative p-4 pt-12">
          {/* Animated background highlights to match the site theme */}
          <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-200/20 blur-[100px] rounded-full" />
          
          <Cal 
            namespace="15min"
            calLink="amrane-yousri-5mwtat/15min"
            style={{width:"100%",height:"100%",overflow:"scroll"}}
            config={{"layout":"month_view"}}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
