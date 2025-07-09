"use client";

import { RestfulItem } from "@/app/types/RestfulItem";
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Collapsible from "@radix-ui/react-collapsible";
import { TbSquareRoundedChevronDown } from "react-icons/tb";
import { TbSquareRoundedChevronUp } from "react-icons/tb";

import "./styles.css";
interface FormValues {
  args: Record<string, string>;
}

interface props {
  item: RestfulItem;
  onResult?: (data: any) => void;
}

interface props_button {
  item: RestfulItem;
  isLoading: boolean;
}

const RequestButton = ({ item, isLoading }: props_button) => {
  const color =
    item.method === "POST"
      ? "green"
      : item.method === "PUT"
      ? "amber"
      : item.method === "DELETE"
      ? "red"
      : "violet";
  return (
    <Button color={color} type="submit" className="w-auto" disabled={isLoading}>
      {item.method}
    </Button>
  );
};

const RequestCard = ({ item, onResult }: props) => {
  const [open, setOpen] = useState(true);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { args: item.args ?? {} },
  });
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setisLoading(true);
    onResult?.("");
    const config = JSON.parse(localStorage.getItem("api-config") || "{}");
    const headers = {
      "X-Base-Url": `http://${config.ip}/func/web_main/api`,
      Authorization: `Basic ${btoa(`${config.username}:${config.password}`)}`,
    };
    const filteredArgs = Object.fromEntries(
      Object.entries(data.args).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    const wrappedData = {
      [item.prefix]: filteredArgs,
    };

    console.log("提交 args:", wrappedData);
    try {
      let ans;
      if (item.method === "POST") {
        ans = await axios.post(
          `/api/proxy?path=${encodeURIComponent(item.url)}`,
          wrappedData,
          { headers }
        );
      } else if (item.method === "GET") {
        const queryString = new URLSearchParams(filteredArgs).toString();
        const fullPath = queryString ? `${item.url}?${queryString}` : item.url;

        ans = await axios.get(
          `/api/proxy?path=${encodeURIComponent(fullPath)}`,
          { headers }
        );
      } else if (item.method === "DELETE") {
        ans = await axios.delete(
          `/api/proxy?path=${encodeURIComponent(item.url)}`,
          { data: wrappedData, headers }
        );
      } else if (item.method === "PUT") {
        ans = await axios.put(
          `/api/proxy?path=${encodeURIComponent(item.url)}`,
          wrappedData,
          { headers }
        );
      }
      console.log(ans);
      onResult?.(ans);
    } catch (err: any) {
      if (err.response) {
        console.log("失败但有响应体：", err.response.data);
        onResult?.({
          error: "请求失败",
          detail: err.response.data,
          status: err.response.status,
        });
      } else {
        console.log("请求异常（如断网）：", err.message);
        onResult?.({ error: "请求失败", detail: err });
      }
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Card size="1">
        <Collapsible.Trigger asChild>
          <Flex justify="between" align="center" p="3" className="items-center">
            <Heading>
              <Text
                style={{
                  background: `linear-gradient(var(--color-indigo-300)) no-repeat left 123% / 100% 48%`,
                }}
                className="font-semibold"
              >
                {item.note}
              </Text>
            </Heading>
            <Text size="6">
              {open ? (
                <TbSquareRoundedChevronUp />
              ) : (
                <TbSquareRoundedChevronDown />
              )}
            </Text>
          </Flex>
        </Collapsible.Trigger>

        <Collapsible.Content className="CollapsibleContent">
          <form onSubmit={handleSubmit(onSubmit)} className=" px-5">
            <Flex direction="column" gap="3">
              {Object.entries(item.args || {}).map(([key, value]) => (
                <Grid columns="2" key={key}>
                  <Text>{key}</Text>
                  <TextField.Root
                    placeholder={key}
                    defaultValue={value}
                    {...register(`args.${key}`)}
                  >
                    <TextField.Slot />
                  </TextField.Root>
                </Grid>
              ))}
              <Flex justify="center">
                <RequestButton item={item} isLoading={isLoading} />
              </Flex>
            </Flex>
          </form>
        </Collapsible.Content>
      </Card>
    </Collapsible.Root>
  );
};

export default RequestCard;
