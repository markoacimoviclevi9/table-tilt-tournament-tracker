
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  team1: z.string().min(1, "Team 1 is required"),
  team2: z.string().min(1, "Team 2 is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  league: z.string().optional(),
  location: z.string().min(1, "Location is required"),
});

// Mock data for teams and leagues
const teams = [
  "Lightning Strikers",
  "Spin Masters",
  "Table Titans",
  "Goal Getters",
  "Foosball Fury",
  "Rod Warriors"
];

const leagues = [
  "Office Champions League",
  "Downtown Foosball Masters",
  "Weekend Warriors"
];

const NewMatch = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team1: "",
      team2: "",
      date: "",
      time: "",
      league: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.team1 === values.team2) {
      form.setError("team2", {
        message: "Teams cannot be the same",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log("Scheduling new match:", values);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Match scheduled successfully!");
      navigate("/matches");
    } catch (error) {
      toast.error("Failed to schedule match. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule a New Match</h1>
        <p className="text-muted-foreground">Create a new foosball match between two teams.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match Details</CardTitle>
          <CardDescription>
            Fill in the information below to schedule your foosball match.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="team1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team 1</FormLabel>
                      <FormControl>
                        <Input 
                          list="teamsList"
                          placeholder="Select or enter team name" 
                          {...field} 
                        />
                      </FormControl>
                      <datalist id="teamsList">
                        {teams.map((team) => (
                          <option key={team} value={team} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team 2</FormLabel>
                      <FormControl>
                        <Input 
                          list="teamsList"
                          placeholder="Select or enter team name"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="league"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>League (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          list="leaguesList"
                          placeholder="Select or enter league name" 
                          {...field} 
                        />
                      </FormControl>
                      <datalist id="leaguesList">
                        {leagues.map((league) => (
                          <option key={league} value={league} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Office Break Room" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/matches")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Scheduling..." : "Schedule Match"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewMatch;
