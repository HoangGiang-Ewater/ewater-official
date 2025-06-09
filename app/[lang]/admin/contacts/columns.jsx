"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconDetails } from "@tabler/icons-react";
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  ArrowUpDown,
  MoreHorizontalIcon,
  ReplyIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";

const options = [
  {
    label: "Detail",
    icon: <IconDetails className="h-4 w-4" />,
    render: (row) => (
      <Link
        href={`/admin/contacts/${row.getValue("id")}`}
        className="w-full flex items-center space-x-2 p-2 text-sm hover:bg-gray-100/10 rounded-md"
      >
        <IconDetails className="h-4 w-4" />
        <span>Detail</span>
      </Link>
    ),
    action: (row) => row.getValue("id"),
    show: () => true,
  },
  {
    label: "Archive",
    icon: <ArchiveIcon className="h-4 w-4" />,
    action: ({ row }) => {
      const id = row.getValue("id");
    },
    // Only show Archive if not archived
    show: (row) => row.getValue("status") !== "archived",
  },
  {
    label: "Unarchive",
    icon: <ArchiveRestoreIcon className="h-4 w-4" />,
    action: () => {},
    // Only show Unarchive if archived
    show: (row) => row.getValue("status") === "archived",
  },
  {
    label: "Delete",
    icon: <TrashIcon className="h-4 w-4" />,
    render: (row) => {
      return (
        <Button
          variant="destructive"
          className="w-full justify-start text-sm p-2 bg-transparent text-red-500 hover:bg-red-500/10 rounded-md"
          onClick={() => {
            const id = row.getValue("id");
            // Handle delete action here
            console.log(`Delete contact with ID: ${id}`);
          }}
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </Button>
      );
    },
    action: () => {},
    show: () => true,
  },
];

export const getOptions = ({ onArchive, onUnarchive, onReply, onDelete }) => [
  {
    label: "Detail",
    icon: <IconDetails className="h-4 w-4" />,
    action: (id) => id,
    render: (row) => (
      <Link
        key={row.getValue("id") + new Date().getMilliseconds()}
        href={`/admin/contacts/${row.getValue("id")}`}
        className="w-full flex items-center space-x-2 p-2 text-sm hover:bg-gray-100/10 rounded-md"
      >
        <IconDetails className="h-4 w-4" />
        <span>Detail</span>
      </Link>
    ),
    show: () => true,
  },
  {
    label: "Archive",
    icon: <ArchiveIcon className="h-4 w-4" />,
    action: (id) => onArchive(id),
    show: (row) => row.getValue("status") !== "archived",
  },
  {
    label: "Unarchive",
    icon: <ArchiveRestoreIcon className="h-4 w-4" />,
    action: (id) => onUnarchive(id),
    show: (row) => row.getValue("status") === "archived",
  },
  {
    label: "Delete",
    icon: <TrashIcon className="h-4 w-4" />,
    action: (id) => onDelete(id),
    render: (row) => {
      return (
        <Button
          key={row.getValue("id") + row.getValue("name")}
          variant="destructive"
          className="w-full justify-start text-sm p-2 bg-transparent text-red-500 hover:bg-red-500/10 rounded-md"
          onClick={() => {
            onDelete(row.getValue("id"));
          }}
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </Button>
      );
    },
    show: () => true,
  },
];

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="text-sm ml-5">#{row.getValue("id")}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {row.getValue("email")}
        </span>
      );
    },
  },
  {
    accessorKey: "message",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {row.getValue("message")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {},
  },
  {
    accessorKey: "note",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Note
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {row.getValue("note")}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => {},
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2">
          {options
            .filter((option) => (option.show ? option.show(row) : true))
            .map((option, index) => (
              <div key={index} className="w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm p-2 hover:bg-gray-100/10 rounded-md"
                  onClick={() => option.action(row)}
                >
                  {option.icon}
                  {option.label}
                </Button>
              </div>
            ))}
        </PopoverContent>
      </Popover>
    ),
  },
];
