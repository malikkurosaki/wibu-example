"use client";
import {
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput
} from "@mantine/core";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import MarkdonwPreview from "@uiw/react-markdown-preview";
import { Frequency, RRule } from "rrule";

const localizer = momentLocalizer(moment);

type Event = {
  title: string;
  start: Date;
  end: Date;
  repeat:
    | "yearly"
    | "monthly"
    | "weekly"
    | "daily"
    | "hourly"
    | "minutely"
    | "secondly";
  count: number;
};

export function CalendarPage({ data }: { data: string }) {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");
  const [eventState, setEventState] = useState<Event[]>([]);
  const [form, setForm] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date(),
    repeat: "yearly",
    count: 1
  });
  const [generatedEvents, setGeneratedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const events = eventState.flatMap((event) => {
      const freq: Frequency =
        event.repeat === "yearly"
          ? RRule.YEARLY
          : event.repeat === "monthly"
          ? RRule.MONTHLY
          : event.repeat === "weekly"
          ? RRule.WEEKLY
          : event.repeat === "daily"
          ? RRule.DAILY
          : event.repeat === "hourly"
          ? RRule.HOURLY
          : event.repeat === "minutely"
          ? RRule.MINUTELY
          : RRule.SECONDLY;

      const rule = new RRule({
        freq,
        interval: 1,
        dtstart: event.start,
        count: event.count
      });

      return rule.all().map((recurrenceDate) => ({
        title: event.title,
        start: recurrenceDate,
        end: new Date(
          recurrenceDate.getTime() +
            (event.end.getTime() - event.start.getTime())
        ),
        repeat: event.repeat,
        count: event.count
      }));
    });

    setGeneratedEvents(events);
  }, [eventState]);

  function handleNavigate(date: Date, view: View, action: string) {
    setDate(date);
  }

  function onSubmit() {
    setEventState((prevEvents) => [...prevEvents, form]);
  }

  return (
    <Stack bg={"white"} color="dark" p={"md"}>
      <Card>
        <Group>
          <Stack>
            <TextInput
              label={"Title"}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextInput
              label={"Start Date"}
              type="datetime-local"
              value={moment(form.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setForm({ ...form, start: new Date(e.target.value) })
              }
            />
            <TextInput
              label={"End Date"}
              type="datetime-local"
              value={moment(form.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setForm({ ...form, end: new Date(e.target.value) })
              }
            />
            <Select
              data={[
                "yearly",
                "monthly",
                "weekly",
                "daily",
                "hourly",
                "minutely",
                "secondly"
              ]}
              label={"Repeat"}
              value={form.repeat}
              onChange={(value) =>
                setForm({ ...form, repeat: value as Event["repeat"] })
              }
            />
            <NumberInput
              label={"Count"}
              value={form.count}
              onChange={(value) =>
                setForm({ ...form, count: value! as Event["count"] })
              }
            />
            <Group>
              <Button onClick={onSubmit}>Submit</Button>
            </Group>
          </Stack>
        </Group>
      </Card>
      <Card bg={"white"} color="black">
        <Stack>
          <Group>
            <TextInput
              onChange={(e) => setDate(new Date(e.target.value))}
              defaultValue={moment(date).format("YYYY-MM-DD")}
              type="date"
              label={"Date"}
            />
          </Group>
          <Calendar
            localizer={localizer}
            events={generatedEvents}
            onNavigate={handleNavigate}
            onSelectEvent={(event) => {
              console.log(event, "event");
            }}
            onShowMore={(date) => {
              console.log(date, "show more");
            }}
            onView={(view) => {
              setView(view);
            }}
            onDrillDown={(date) => {
              console.log(date, "on drill down");
            }}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            date={date}
            view={view}
          />
        </Stack>
      </Card>

      <MarkdonwPreview source={data} style={{ padding: 16 }} />
    </Stack>
  );
}
