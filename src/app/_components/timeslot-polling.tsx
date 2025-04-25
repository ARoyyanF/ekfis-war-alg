"use client";

import { useState } from "react";
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
import TimeslotTable, {
  type TimeslotData,
} from "~/app/_components/timeslot-table";
import { api } from "~/trpc/react";
import { toast } from "sonner"; // Import sonner toast
import { Loader2 } from "lucide-react";

// Mock data for timeslot tables
const mockTimeslotTables: Array<{
  id: number;
  name: string;
  description: string;
  slots: TimeslotData;
}> = [
  {
    id: 1,
    name: "Jadwal A",
    description:
      "Berdasarkan gale-shapely matching algorithm tanpa elemen randomisasi",
    slots: {
      Monday: {
        "07:00": 1,
        "08:00": 2,
        "09:00": 3,
        "10:00": 4,
        "11:00": 5,
        "12:00": 40,
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
    name: "Jadwal B",
    description:
      "Berdasarkan gale-shapely matching algorithm dengan elemen randomisasi",
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
    name: "Jadwal C",
    description:
      "Berdasarkan gale-shapely matching algorithm dengan elemen randomisasi",
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
  {
    id: 4,
    name: "Jadwal D",
    description:
      "Berdasarkan gale-shapely matching algorithm dengan elemen randomisasi",
    slots: {
      Monday: {
        "07:00": 23,
        "08:00": null,
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
  const [activeTab, setActiveTab] = useState("view");

  const { data: userData, isLoading: isLoadingUser } =
    api.authorization.getMahasiswaData.useQuery(undefined, {
      retry: false,
      refetchOnWindowFocus: false,
    });

  const {
    data: voteCountsData,
    isLoading: isLoadingVotes,
    refetch: refetchVotes,
  } = api.voting.getVoteCounts.useQuery(undefined, {
    refetchInterval: 5000,
  });

  const recordVoteMutation = api.voting.recordVote.useMutation({
    onSuccess: async () => {
      toast.success("Vote updated successfully!");
      await refetchVotes();
    },
    onError: (error) => {
      toast.error("Error updating vote", { description: error.message });
    },
  });

  const userVoted = userData?.votedScheduleId ?? null;

  const totalVotes = voteCountsData
    ? Object.values(voteCountsData).reduce((sum, count) => sum + count, 0)
    : 0;

  const handleVote = (tableId: number) => {
    if (userVoted) {
      toast.error("Already voted", {
        description: "You can reset your vote first if you want to change it.",
      });
      return;
    }
    if (!userData) {
      toast.error("Not Logged In", {
        description: "Please log in and register your NIM to vote.",
      });
      return;
    }

    recordVoteMutation.mutate({ scheduleId: tableId });
    setActiveTab("results");
  };

  const resetVote = () => {
    if (!userVoted) {
      toast.error("No vote to reset");
      return;
    }
    if (!userData) {
      toast.error("Not Logged In", {
        description: "Please log in and register your NIM to reset vote.",
      });
      return;
    }
    recordVoteMutation.mutate({ scheduleId: null });
  };

  if (isLoadingUser || isLoadingVotes) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2">Loading voting data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="view">Voting</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-8">
          {mockTimeslotTables.map((table) => {
            const currentVoteCount = voteCountsData?.[table.id] ?? 0;
            return (
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
                    disabled={
                      userVoted !== null ||
                      recordVoteMutation.isPending ||
                      !userData
                    }
                    variant={userVoted === table.id ? "secondary" : "default"}
                  >
                    {recordVoteMutation.isPending &&
                    recordVoteMutation.variables?.scheduleId === table.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {userVoted === table.id
                      ? "Your Vote"
                      : "Vote for this option"}
                  </Button>
                  {currentVoteCount > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {currentVoteCount} vote{currentVoteCount !== 1 ? "s" : ""}
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Voting Results</CardTitle>
              <CardDescription>Total votes: {totalVotes}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockTimeslotTables.map((table) => {
                const voteCount = voteCountsData?.[table.id] ?? 0;
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
                <Button
                  variant="outline"
                  onClick={resetVote}
                  disabled={recordVoteMutation.isPending || !userData}
                >
                  {recordVoteMutation.isPending &&
                  recordVoteMutation.variables?.scheduleId === null ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
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
