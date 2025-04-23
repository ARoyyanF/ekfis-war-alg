"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import TimeslotTable from "~/app/_components/timeslot-table";
// import { toast } from "~/hooks/use-toast";

// Mock data for timeslot tables
const mockTimeslotTables = [
  {
    id: 1,
    name: "Option A",
    description: "Morning focus for Group 1, afternoon for Group 2",
    slots: {
      Monday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 1,
        "10:00": 1,
        "11:00": 1,
        "12:00": 2,
        "13:00": 2,
        "14:00": null,
        "15:00": 2,
        "16:00": 2,
        "17:00": null,
      },
      Tuesday: {
        "07:00": 2,
        "08:00": 2,
        "09:00": 2,
        "10:00": 2,
        "11:00": 2,
        "12:00": 1,
        "13:00": 1,
        "14:00": 1,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
      Wednesday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 1,
        "10:00": 1,
        "11:00": 1,
        "12:00": 2,
        "13:00": 2,
        "14:00": 2,
        "15:00": 2,
        "16:00": 2,
        "17:00": null,
      },
      Thursday: {
        "07:00": 2,
        "08:00": 2,
        "09:00": 2,
        "10:00": 2,
        "11:00": 2,
        "12:00": 1,
        "13:00": 1,
        "14:00": 1,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
      Friday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 1,
        "10:00": 1,
        "11:00": 1,
        "12:00": 2,
        "13:00": 2,
        "14:00": 2,
        "15:00": 2,
        "16:00": 2,
        "17:00": null,
      },
    },
  },
  {
    id: 2,
    name: "Option B",
    description: "Alternating days for each group",
    slots: {
      Monday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 1,
        "10:00": 1,
        "11:00": 1,
        "12:00": 1,
        "13:00": 1,
        "14:00": 1,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
      Tuesday: {
        "07:00": 2,
        "08:00": 2,
        "09:00": 2,
        "10:00": 2,
        "11:00": 2,
        "12:00": 2,
        "13:00": 2,
        "14:00": 2,
        "15:00": 2,
        "16:00": 2,
        "17:00": null,
      },
      Wednesday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 1,
        "10:00": 1,
        "11:00": 1,
        "12:00": 1,
        "13:00": 1,
        "14:00": 1,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
      Thursday: {
        "07:00": 2,
        "08:00": 2,
        "09:00": 2,
        "10:00": 2,
        "11:00": 2,
        "12:00": 2,
        "13:00": 2,
        "14:00": 2,
        "15:00": 2,
        "16:00": 2,
        "17:00": null,
      },
      Friday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 1,
        "10:00": 1,
        "11:00": 1,
        "12:00": 1,
        "13:00": 1,
        "14:00": 1,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
    },
  },
  {
    id: 3,
    name: "Option C",
    description: "Mixed arrangement with shared slots",
    slots: {
      Monday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 2,
        "10:00": 2,
        "11:00": 1,
        "12:00": 1,
        "13:00": 2,
        "14:00": 2,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
      Tuesday: {
        "07:00": 2,
        "08:00": 2,
        "09:00": 1,
        "10:00": 1,
        "11:00": 2,
        "12:00": 2,
        "13:00": 1,
        "14:00": 1,
        "15:00": 2,
        "16:00": 2,
        "17:00": null,
      },
      Wednesday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 2,
        "10:00": 2,
        "11:00": 1,
        "12:00": 1,
        "13:00": 2,
        "14:00": 2,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
      Thursday: {
        "07:00": 2,
        "08:00": 2,
        "09:00": 1,
        "10:00": 1,
        "11:00": 2,
        "12:00": 2,
        "13:00": 1,
        "14:00": 1,
        "15:00": 2,
        "16:00": 2,
        "17:00": null,
      },
      Friday: {
        "07:00": 1,
        "08:00": 1,
        "09:00": 2,
        "10:00": 2,
        "11:00": 1,
        "12:00": 1,
        "13:00": 2,
        "14:00": 2,
        "15:00": 1,
        "16:00": 1,
        "17:00": null,
      },
    },
  },
];

export default function TimeslotPolling() {
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [userVoted, setUserVoted] = useState<number | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [activeTab, setActiveTab] = useState("view");

  // Load votes from localStorage on component mount
  useEffect(() => {
    const savedVotes = localStorage.getItem("timeslotVotes");
    const userVote = localStorage.getItem("userTimeslotVote");

    if (savedVotes) {
      const parsedVotes = JSON.parse(savedVotes);
      setVotes(parsedVotes);

      // Calculate total votes
      const total = Object.values(parsedVotes).reduce(
        (sum: number, count: number) => sum + count,
        0,
      );
      setTotalVotes(total);
    } else {
      // Initialize with empty votes
      const initialVotes = mockTimeslotTables.reduce(
        (acc, table) => {
          acc[table.id] = 0;
          return acc;
        },
        {} as Record<number, number>,
      );
      setVotes(initialVotes);
    }

    if (userVote) {
      setUserVoted(Number.parseInt(userVote));
    }
  }, []);

  const handleVote = (tableId: number) => {
    if (userVoted) {
      //   toast({
      //     title: "Already voted",
      //     description: "You have already cast your vote.",
      //     variant: "destructive",
      //   });
      return;
    }

    const newVotes = { ...votes };
    newVotes[tableId] = (newVotes[tableId] || 0) + 1;

    // Save to localStorage
    localStorage.setItem("timeslotVotes", JSON.stringify(newVotes));
    localStorage.setItem("userTimeslotVote", tableId.toString());

    setVotes(newVotes);
    setUserVoted(tableId);
    setTotalVotes(totalVotes + 1);
    setActiveTab("results");

    // toast({
    //   title: "Vote recorded",
    //   description: "Thank you for your vote!",
    // });
  };

  const resetVote = () => {
    localStorage.removeItem("userTimeslotVote");

    const newVotes = { ...votes };
    if (userVoted) {
      newVotes[userVoted] = Math.max(0, (newVotes[userVoted] || 0) - 1);
    }

    localStorage.setItem("timeslotVotes", JSON.stringify(newVotes));

    setVotes(newVotes);
    setUserVoted(null);
    setTotalVotes(Math.max(0, totalVotes - 1));

    // toast({
    //   title: "Vote reset",
    //   description: "You can now vote again.",
    // });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="view">View Options</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-8">
          {mockTimeslotTables.map((table) => (
            <Card key={table.id} className="w-full">
              <CardHeader>
                <CardTitle>{table.name}</CardTitle>
                <CardDescription>{table.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeslotTable slots={table.slots} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => handleVote(table.id)}
                  disabled={userVoted !== null}
                  variant={userVoted === table.id ? "secondary" : "default"}
                >
                  {userVoted === table.id
                    ? "Your Vote"
                    : "Vote for this option"}
                </Button>
                {votes[table.id] > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {votes[table.id]} vote{votes[table.id] !== 1 ? "s" : ""}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Voting Results</CardTitle>
              <CardDescription>Total votes: {totalVotes}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockTimeslotTables.map((table) => {
                const voteCount = votes[table.id] || 0;
                const percentage =
                  totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                return (
                  <div key={table.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">
                        {table.name}
                        {userVoted === table.id && (
                          <span className="ml-2 text-sm text-primary">
                            (Your vote)
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {voteCount} vote{voteCount !== 1 ? "s" : ""} (
                        {percentage.toFixed(1)}%)
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
            <CardFooter>
              {userVoted && (
                <Button variant="outline" onClick={resetVote}>
                  Reset my vote
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
