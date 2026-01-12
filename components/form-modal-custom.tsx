"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { 
  Loader2, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Building2, 
  Phone, 
  User, 
  MessageSquare,
  Zap,
  ArrowRight,
  ShieldCheck,
  Rocket,
  Calendar as CalendarIcon,
  Clock
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

const WEBHOOK_URL = "https://n8n.srv1231456.hstgr.cloud/webhook-test/contact"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  companyName: z.string().min(1, {
    message: "Company name is required.",
  }),
  phoneNumber: z.string().optional(),
  preferredDate: z.date({
    required_error: "Please select a preferred date for your call.",
  }),
  preferredTime: z.string({
    required_error: "Please select a time slot.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
]

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      preferredTime: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      const formattedData = {
        ...values,
        preferredDate: format(values.preferredDate, "PPP"),
        scheduledDateTime: `${format(values.preferredDate, "PPP")} at ${values.preferredTime}`,
      }
      
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })
      
      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setIsSuccess(true)
      setShowConfetti(true)
      form.reset()
      
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false)
        setShowConfetti(false)
        form.reset()
      }, 300)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[680px] max-h-[95vh] overflow-y-auto p-0 border-0 bg-transparent shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] rounded-[40px] sm:rounded-[40px]">
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.3}
            className="z-50"
          />
        )}

        <div className="relative z-10 p-10 md:p-12 border-2 border-white/20 bg-white/95 glass backdrop-blur-2xl rounded-[40px] overflow-hidden">
          
          <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-200/20 blur-[100px] rounded-full" />

          <div className="flex flex-col items-center mb-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 rounded-[24px] shadow-2xl flex items-center justify-center mb-6 ring-8 ring-blue-50 animate-glow"
            >
              <Zap className="h-10 w-10 text-white fill-current" />
            </motion.div>
            
            <DialogHeader className="items-center space-y-3">
              <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
                {isSuccess ? "You're all set!" : "Let's Scale Your Business"}
              </DialogTitle>
              <DialogDescription className="text-lg text-slate-500 font-medium max-w-[400px]">
                {isSuccess 
                  ? "We've received your data. Expect an email from us within the next 24 hours." 
                  : "Fill in your details and we'll handle the rest. Your automation journey starts here."}
              </DialogDescription>
            </DialogHeader>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center space-y-10"
              >
                <div className="w-full bg-white/40 border border-slate-100 rounded-[32px] p-8 text-center space-y-4 shadow-inner">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2 border border-green-100 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">System Ready</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Submission complete. Our AI team has been notified.
                  </p>
                </div>

                <div className="flex justify-center gap-12">
                   {[
                    { icon: User, color: "text-blue-500" },
                    { icon: Mail, color: "text-indigo-500" },
                    { icon: ShieldCheck, color: "text-cyan-500" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center ${item.color}`}
                    >
                      <item.icon className="w-6 h-6" />
                    </motion.div>
                  ))}
                </div>

                <Button 
                  onClick={handleClose} 
                  className="w-full h-16 bg-slate-900 hover:bg-black text-white font-bold text-xl rounded-[24px] shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95"
                >
                  Close & Proceed
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-slate-800 font-bold text-sm ml-2">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Elon Musk" 
                                className="h-14 rounded-2xl border-slate-200/60 bg-white/50 focus:bg-white focus:ring-[6px] focus:ring-blue-100 transition-all font-semibold px-6 shadow-sm placeholder:text-slate-300" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="ml-2 font-bold" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-slate-800 font-bold text-sm ml-2">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="elon@x.com" 
                                className="h-14 rounded-2xl border-slate-200/60 bg-white/50 focus:bg-white focus:ring-[6px] focus:ring-blue-100 transition-all font-semibold px-6 shadow-sm placeholder:text-slate-300" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="ml-2 font-bold" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-slate-800 font-bold text-sm ml-2">Company</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="SpaceX" 
                                className="h-14 rounded-2xl border-slate-200/60 bg-white/50 focus:bg-white focus:ring-[6px] focus:ring-blue-100 transition-all font-semibold px-6 shadow-sm placeholder:text-slate-300" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="ml-2 font-bold" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-slate-800 font-bold text-sm ml-2">Phone</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+1 234 567 890" 
                                className="h-14 rounded-2xl border-slate-200/60 bg-white/50 focus:bg-white focus:ring-[6px] focus:ring-blue-100 transition-all font-semibold px-6 shadow-sm placeholder:text-slate-300" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="ml-2 font-bold" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-slate-800 font-bold text-sm ml-2 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-blue-600" />
                            When works best for you?
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="bg-gradient-to-br from-white/60 via-cyan-50/40 to-blue-50/40 border-2 border-cyan-100/80 rounded-[28px] p-6 shadow-xl backdrop-blur-sm">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                  }
                                  className="mx-auto"
                                  classNames={{
                                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                    month: "space-y-4",
                                    caption: "flex justify-center pt-1 relative items-center mb-4",
                                    caption_label: "text-lg font-black text-slate-800",
                                    nav: "space-x-1 flex items-center",
                                    nav_button: cn(
                                      "h-10 w-10 bg-white/80 hover:bg-white p-0 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md hover:scale-110"
                                    ),
                                    nav_button_previous: "absolute left-1",
                                    nav_button_next: "absolute right-1",
                                    table: "w-full border-collapse space-y-1",
                                    head_row: "flex justify-between mb-2",
                                    head_cell: "text-slate-500 rounded-lg w-12 font-bold text-sm uppercase",
                                    row: "flex w-full mt-2 justify-between",
                                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                                    day: cn(
                                      "h-12 w-12 p-0 font-bold rounded-xl hover:bg-blue-50 hover:scale-110 transition-all duration-200 aria-selected:opacity-100"
                                    ),
                                    day_selected:
                                      "bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-600 shadow-lg shadow-blue-200 scale-110 ring-4 ring-blue-100",
                                    day_today: "bg-cyan-50 text-cyan-700 font-black border-2 border-cyan-200",
                                    day_outside: "text-slate-300 opacity-50",
                                    day_disabled: "text-slate-200 opacity-30 cursor-not-allowed",
                                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                    day_hidden: "invisible",
                                  }}
                                />
                              </div>
                              {field.value && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-3 text-center"
                                >
                                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-full px-5 py-2.5 shadow-sm">
                                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-black text-blue-700">
                                      {format(field.value, "EEEE, MMMM d, yyyy")}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="ml-2 font-bold" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-slate-800 font-bold text-sm ml-2 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            Select Time Slot
                          </FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                              {timeSlots.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => field.onChange(time)}
                                  className={cn(
                                    "h-12 rounded-xl border-2 font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95",
                                    field.value === time
                                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg shadow-blue-200 ring-2 ring-blue-100"
                                      : "bg-white/50 border-slate-200/60 text-slate-700 hover:bg-white hover:border-blue-300 hover:shadow-md"
                                  )}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage className="ml-2 font-bold" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-slate-800 font-bold text-sm ml-2">How can we help?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="I want to automate my support team..." 
                              className="min-h-[120px] rounded-[24px] border-slate-200/60 bg-white/50 focus:bg-white focus:ring-[6px] focus:ring-blue-100 transition-all font-semibold px-6 py-4 shadow-sm placeholder:text-slate-300 resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="ml-2 font-bold" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-16 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white font-black text-xl rounded-full shadow-[0_20px_40px_-12px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group overflow-hidden relative"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-7 w-7 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Book Strategy Session
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] pt-4 opacity-50">
                      <ShieldCheck className="w-4 h-4" />
                      100% Encrypted & Secure
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
