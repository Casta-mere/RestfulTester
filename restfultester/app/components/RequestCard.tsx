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
import { useForm } from "react-hook-form";

interface FormValues {
  args: Record<string, string>;
}

interface props {
  item: RestfulItem;
  onResult?: (data: any) => void;
}

interface props_button {
  item: RestfulItem;
}

const basurl = "http://10.136.48.97/func/web_main/api/";

const RequestButton = ({ item }: props_button) => {
  const color =
    item.method === "POST"
      ? "green"
      : item.method === "PUT"
      ? "amber"
      : item.method === "DELETE"
      ? "red"
      : "violet";
  return (
    <Button color={color} type="submit" className="w-auto">
      {item.method}
    </Button>
  );
};

const RequestCard = ({ item, onResult }: props) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { args: item.args ?? {} },
  });

  const onSubmit = async (data: FormValues) => {
    onResult?.("");
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
          wrappedData
        );
      } else if (item.method === "GET") {
        const queryString = new URLSearchParams(filteredArgs).toString();
        const fullPath = queryString ? `${item.url}?${queryString}` : item.url;

        ans = await axios.get(
          `/api/proxy?path=${encodeURIComponent(fullPath)}`
        );
      } else if (item.method === "DELETE") {
        ans = await axios.delete(
          `/api/proxy?path=${encodeURIComponent(item.url)}`,
          { data: wrappedData }
        );
      } else if (item.method === "PUT") {
        ans = await axios.put(
          `/api/proxy?path=${encodeURIComponent(item.url)}`,
          wrappedData
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
    }
  };

  return (
    <Card size="1">
      <Flex justify="between" direction="column">
        <Flex>
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
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4">
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
              <RequestButton item={item} />
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
};

export default RequestCard;
