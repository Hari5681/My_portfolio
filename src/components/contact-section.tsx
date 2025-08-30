
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send, User, MessageSquare, Instagram, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(1, 'Message is required.'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export function ContactSection() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message
          }
        ]);

      if (error) {
        throw new Error(error.message);
      }

      toast({ title: 'Success!', description: 'Your message has been sent successfully!' });
      form.reset();
      setIsSuccess(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: error.message || 'There was a problem sending your message.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl shadow-2xl shadow-accent/10">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-accent text-shadow-glow-accent">Get in Touch</CardTitle>
                <CardDescription className="text-lg">
                  I'd love to hear from you! Whether you have feedback, a bug report, or a project proposal, my inbox is always open.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.2 } }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
                      >
                         <CheckCircle className="w-12 h-12 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mt-6 text-foreground">Message Sent!</h3>
                      <p className="text-muted-foreground mt-2">Thank you for your feedback. I'll get back to you soon.</p>
                      <Button onClick={() => setIsSuccess(false)} className="mt-8">Send Another Message</Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      variants={containerVariants}
                    >
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <motion.div variants={itemVariants}>
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <FormControl>
                                          <Input placeholder="Name" {...field} className="bg-background/50 pl-12 h-12 input-glow-border" />
                                        </FormControl>
                                      </div>
                                      <FormMessage className="pl-4" />
                                    </FormItem>
                                  )}
                                />
                             </motion.div>
                             <motion.div variants={itemVariants}>
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <FormControl>
                                          <Input type="email" placeholder="Email" {...field} className="bg-background/50 pl-12 h-12 input-glow-border"/>
                                        </FormControl>
                                      </div>
                                      <FormMessage className="pl-4" />
                                    </FormItem>
                                  )}
                                />
                             </motion.div>
                              <motion.div variants={itemVariants}>
                                <FormField
                                  control={form.control}
                                  name="message"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="relative">
                                        <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-muted-foreground" />
                                        <FormControl>
                                          <Textarea
                                            placeholder="Your Message"
                                            rows={5}
                                            {...field}
                                            className="bg-background/50 pl-12 pt-4 input-glow-border"
                                          />
                                        </FormControl>
                                      </div>
                                      <FormMessage className="pl-4" />
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            <motion.div variants={itemVariants} className="flex justify-center">
                              <Button type="submit" size="lg" className="btn-glow w-full md:w-auto" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <Send className="mr-2 h-5 w-5"/>}
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                              </Button>
                            </motion.div>
                          </form>
                        </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-10 text-center">
                  <p className="text-muted-foreground mb-4">Or find me on</p>
                  <div className="flex justify-center gap-6">
                    <motion.a href={`/redirect?url=${encodeURIComponent('https://github.com/Hari5681')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }}>
                        <Github className="h-7 w-7" />
                    </motion.a>
                     <motion.a href={`/redirect?url=${encodeURIComponent('https://www.linkedin.com/in/hari5681/')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }}>
                        <Linkedin className="h-7 w-7" />
                    </motion.a>
                     <motion.a href={`/redirect?url=${encodeURIComponent('https://www.instagram.com/hari.krishna.00?igsh=cmF2cHA1eTE3ZmJw')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }}>
                        <Instagram className="h-7 w-7" />
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
