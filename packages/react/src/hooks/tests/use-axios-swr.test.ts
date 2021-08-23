import { request } from "@hackney/mtfh-test-utils"
import { act, renderHook } from "@testing-library/react-hooks"

import { useAxiosSWR, useAxiosSWRInfinite } from "../use-axios-swr"

describe("useAxiosSWR", () => {
  test("it configures useSWR correctly", async () => {
    request({ path: "/api", data: "request" })
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosSWR<string>("/api"),
    )
    expect(result.current.data).toBe(undefined)
    await waitForNextUpdate()
    expect(result.current.data).toBe("request")
  })
})

describe("useAxiosSWRInfinite", () => {
  test("it configures useSWR correctly", async () => {
    request({ path: "/api/1", data: "request 1" })
    request({ path: "/api/2", data: "request 2" })
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosSWRInfinite<string>((index) => `/api/${index + 1}`),
    )
    expect(result.current.data).toBe(undefined)
    await waitForNextUpdate()
    expect(result.current.data).toStrictEqual(["request 1"])

    act(() => {
      result.current.setSize(result.current.size + 1).catch((e) => {
        throw e
      })
    })

    await waitForNextUpdate()

    expect(result.current.data).toStrictEqual(["request 1", "request 2"])
  })
})
