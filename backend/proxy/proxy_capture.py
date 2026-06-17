from mitmproxy import http
import requests

session = requests.Session()
session.trust_env = False


def request(flow: http.HTTPFlow):

    # Ignore requests to our own backend
    if "127.0.0.1:8000" in flow.request.pretty_url:
        return

    data = {
        "url": flow.request.pretty_url,
        "method": flow.request.method,
        "headers": dict(flow.request.headers)
    }

    try:
        session.post(
            "http://127.0.0.1:8000/add_request",
            json=data,
            timeout=1
        )

        print(
            f"[CAPTURED] {flow.request.method} {flow.request.pretty_url}"
        )

    except Exception as e:
        print(f"Error: {e}")