import ky, { HTTPError, type KyResponse, type Options } from "ky";

export async function fetcher(
	endpoint: string,
	options: Options = {},
): Promise<KyResponse> {
	try {
		return await ky("http://127.0.0.1:8787" + endpoint, options);
	} catch (err: any) {
		const error = err as HTTPError;
		const parseErr = (await error.response.json()) as { error: string };
		throw new Error(
			parseErr.error || "An error occurred during data fetching.",
		);
	}
}
