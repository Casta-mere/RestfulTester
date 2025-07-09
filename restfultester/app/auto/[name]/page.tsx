"use client";
import RequestCard from "@/app//components/RequestCard";
import StatusCodeDisplay from "@/app//components/StatusCodeDisplay";
import { dataMap } from "@/app/data";
import { Card, Flex, Grid, ScrollArea } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

export default function AutoPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const [result, setResult] = useState<any>(null);
  const resolvedParams = React.use(params);
  const requestList = dataMap[resolvedParams.name] || [];
  return (
    <Grid columns="2">
      <Flex direction="column" gap="3" p="5">
        {requestList.map((i) => (
          <RequestCard
            item={i}
            key={i.note}
            onResult={(res) => {
              setResult(res);
            }}
          />
        ))}
      </Flex>
      <Flex p="5" className="sticky top-0 h-screen">
        <Card className="w-full">
          {!result && "请点击左侧发送请求"}{" "}
          {result && (
            <>
              <StatusCodeDisplay status={result.status} />
              <ScrollArea
                type="always"
                scrollbars="vertical"
                style={{ height: 850 }}
              >
                <div className="pr-4">
                  <div style={{ overflowX: "auto" }}>
                    <ReactJson
                      src={result}
                      name={false}
                      collapsed={false}
                      enableClipboard={false}
                      displayDataTypes={false}
                      displayObjectSize={false}
                      theme="rjv-default"
                      style={{
                        fontSize: "14px",
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        wordBreak: "break-word",
                      }}
                    />
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </Card>
      </Flex>
    </Grid>
  );
}
