"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { GoGear } from "react-icons/go";

export default function ConfigPanel() {
  const [config, setConfig] = useState({
    ip: "10.136.48.97",
    username: "admin",
    password: "admin_default",
  });

  const [draftConfig, setDraftConfig] = useState(config);

  // 加载 localStorage 初始配置
  useEffect(() => {
    const saved = localStorage.getItem("api-config");
    if (saved) {
      const parsed = JSON.parse(saved);
      setConfig(parsed);
      setDraftConfig(parsed); // 初始化编辑状态
    }
  }, []);

  const updateField = (key: keyof typeof draftConfig, value: string) => {
    setDraftConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setConfig(draftConfig);
    localStorage.setItem("api-config", JSON.stringify(draftConfig));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <GoGear className="text-gray-400 hover:text-gray-700 cursor-pointer" />
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>接口配置</Dialog.Title>
        <Flex direction="column" gap="3">
          <label className="block">
            IP 地址:
            <input
              className="w-full border px-2 py-1 mt-1 rounded"
              value={draftConfig.ip}
              onChange={(e) => updateField("ip", e.target.value)}
            />
          </label>

          <label className="block">
            用户名:
            <input
              className="w-full border px-2 py-1 mt-1 rounded"
              value={draftConfig.username}
              onChange={(e) => updateField("username", e.target.value)}
            />
          </label>

          <label className="block">
            密码:
            <input
              className="w-full border px-2 py-1 mt-1 rounded"
              value={draftConfig.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </label>

          <div className="text-gray-500 text-sm">
            所有数据将保存在浏览器中，仅本地可见。
          </div>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              取消
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSave}>保存</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
