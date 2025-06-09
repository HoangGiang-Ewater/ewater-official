"use client";

import {
  deleteProject,
  getProjectStatusById,
  hideProject,
  unhideProject,
} from "@/api/projects";
import { Button } from "@/components/ui/button";
import { useTextEditorContext } from "@/contexts/TextEditorContext";
import { getDrafts, saveDraft } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FilePlusIcon, MoveRightIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

function TextEditorBottomBar({ editor, setDrafts, onSubmit, invalidateQuery }) {
  const { id } = useParams();
  const { dispatch } = useTextEditorContext();

  // delete
  const deleteMutation = useMutation({
    mutationKey: ["delete-post", id],
    mutationFn: (id) => deleteProject(id),
    onSuccess: () => {
      toast.success("Post deleted", {
        description: "The post has been deleted successfully.",
      });
      invalidateQuery();
    },
  });

  const onDelete = () => {
    const confirmed = window.confirm(
      "This post will be permanently deleted. Are you sure?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  // hide
  const hideMutation = useMutation({
    mutationKey: ["hide-post", id],
    mutationFn: (id) => hideProject(id),
    onSuccess: () => {
      toast({
        title: "Post hidden",
        description: "The post has been hidden successfully.",
      });
      invalidateQuery();
    },
  });

  const onHide = () => {
    const confirmed = window.confirm("This post will be hidden. Are you sure?");

    if (!confirmed) return;

    hideMutation.mutate(id);
  };

  // unhide
  const unhideMutation = useMutation({
    mutationKey: ["unhide-post", id],
    mutationFn: (id) => unhideProject(id),
    onSuccess: () => {
      toast({
        title: "Post unhidden",
        description: "The post has been unhidden successfully.",
      });
      invalidateQuery();
    },
  });

  const onUnhide = () => {
    const confirmed = window.confirm(
      "This post will be unhidden. Are you sure?"
    );

    if (!confirmed) return;

    unhideMutation.mutate(id);
  };

  const {
    data: statusData,
    isLoading: projectStatusLoading,
    isError: projectStatusError,
  } = useQuery({
    queryKey: ["project_status", id],
    queryFn: () => getProjectStatusById(id),
  });

  return (
    <div className="flex justify-end mt-4">
      {id && (
        <>
          <Button
            className={"mr-2"}
            variant={"destructive"}
            type="button"
            onClick={onDelete}
          >
            Delete post
          </Button>
          {projectStatusLoading ? (
            <Button className={"mr-2"} variant={"outline"} disabled>
              Loading...
            </Button>
          ) : projectStatusError ? (
            <Button className={"mr-2"} variant={"outline"} disabled>
              Error loading status
            </Button>
          ) : statusData.is_hidden ? (
            <Button className={"mr-2"} variant={"outline"} onClick={onUnhide}>
              Unhide Post
            </Button>
          ) : (
            <Button className={"mr-2"} variant={"outline"} onClick={onHide}>
              Hide Post
            </Button>
          )}
        </>
      )}
      <Button
        type="button"
        className={"mr-2"}
        variant={"outline"}
        onClick={() =>
          saveDraft(editor, "My Draft", (draft) => {
            toast({
              title: "Draft saved",
              description: "Your draft has been saved successfully.",
            });
            dispatch({ type: "SET_DRAFTS", drafts: getDrafts() });
          })
        }
      >
        <FilePlusIcon className="w-4 h-4" />
        Save as Draft
      </Button>
      <Button onClick={onSubmit} variant={"default"}>
        Publish Post <MoveRightIcon className="ml-2" />
      </Button>
    </div>
  );
}

export default TextEditorBottomBar;
