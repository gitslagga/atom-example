## localhost:26657 tcp and http api

#### Math Wallet
* slagga nonce
* rival kiss spawn host crucial deer uniform sea cluster short chest recall board strike enrich index category audit love virus prevent umbrella allow child
```
                ^  +-------------------------------+  ^
                |  |                               |  |
                |  |     AtomApi 127.0.0.1:3000    |  |
                |  |                               |  |   Atom SDK
                |  |            ^      +           |  |
                |  +-------- | Intereact | --------+  v
                |  |            +      v           |  ^
                |  |                               |  |
Blockchain api  |  |        Rest 127.0.0.1317      |  |
                |  |                               |  |
                |  +-------------------------------+  |   Wallet Core
                |  |                               |  |
                |  |        Rpc 127.0.0.26657      |  |
                |  |                               |  |
                v  +-------------------------------+  v
```


#### /abci_info
* curl tcp@localhost:26657/abci_info | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "response": {
      "data": "GaiaApp",
      "last_block_height": "1164567",
      "last_block_app_hash": "koNMtqyg/w68p5sdsQTJaOGoR97DvpZ4Q0fF/o2Rq6M="
    }
  }
}
```

#### /status
* curl tcp@localhost:26657/status | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "c0b57e26e3bf60750b729fa7257fb2ac6d7b08ec",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "cosmoshub-2",
      "version": "0.31.5",
      "channels": "4020212223303800",
      "moniker": "slagga",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://127.0.0.1:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "C314690F55B7C23C3A9D4EF7F0026195383419109A95B36209FF4FC31FB42E26",
      "latest_app_hash": "727CC23F8BB2DEE5F12B3FB9BDCE4DD4FE1662E642BA632996A86D9D8FC06D8C",
      "latest_block_height": "1163772",
      "latest_block_time": "2019-07-24T14:08:42.055264305Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "FF611B7E19B28170C43AFF5991908B7637D0E11E",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "32YTvy1nWBQIAxBwg7iZ6kniKiR2H83WEL2+1OwF6pQ="
      },
      "voting_power": "0"
    }
  }
}
```

#### /num_unconfirmed_txs
* curl tcp@localhost:26657/num_unconfirmed_txs | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "n_txs": "0",
    "total": "0",
    "total_bytes": "0",
    "txs": null
  }
}
```

#### /unconfirmed_txs
* curl tcp@localhost:26657/unconfirmed_txs?limit= | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "n_txs": "0",
    "total": "0",
    "total_bytes": "0",
    "txs": []
  }
}
```

#### /net_info
* curl tcp@localhost:26657/net_info | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "listening": true,
    "listeners": [
      "Listener(@)"
    ],
    "n_peers": "10",
    "peers": [
      {
        "node_info": {
          "protocol_version": {
            "p2p": "7",
            "block": "10",
            "app": "0"
          },
          "id": "3165412e2d8d5563fe17fe0f794e384071dd5372",
          "listen_addr": "tcp://139.99.124.225:26656",
          "network": "cosmoshub-2",
          "version": "0.31.5",
          "channels": "4020212223303800",
          "moniker": "Castlenode",
          "other": {
            "tx_index": "on",
            "rpc_address": "tcp://127.0.0.1:26657"
          }
        },
        "is_outbound": true,
        "connection_status": {
          "Duration": "154796471903573",
          "SendMonitor": {
            "Active": true,
            "Start": "2019-08-13T11:00:01.28Z",
            "Duration": "154796480000000",
            "Idle": "160000000",
            "Bytes": "6785220",
            "Samples": "356890",
            "InstRate": "119",
            "CurRate": "51",
            "AvgRate": "44",
            "PeakRate": "63088",
            "BytesRem": "0",
            "TimeRem": "0",
            "Progress": 0
          },
          "RecvMonitor": {
            "Active": true,
            "Start": "2019-08-13T11:00:01.28Z",
            "Duration": "154796480000000",
            "Idle": "320000000",
            "Bytes": "6537460293",
            "Samples": "352222",
            "InstRate": "57091",
            "CurRate": "41635",
            "AvgRate": "42233",
            "PeakRate": "4058130",
            "BytesRem": "0",
            "TimeRem": "0",
            "Progress": 0
          },
          "Channels": [
            {
              "ID": 48,
              "SendQueueCapacity": "1",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "0"
            },
            {
              "ID": 64,
              "SendQueueCapacity": "1000",
              "SendQueueSize": "0",
              "Priority": "10",
              "RecentlySent": "211"
            },
            {
              "ID": 32,
              "SendQueueCapacity": "100",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "0"
            },
            {
              "ID": 33,
              "SendQueueCapacity": "100",
              "SendQueueSize": "0",
              "Priority": "10",
              "RecentlySent": "0"
            },
            {
              "ID": 34,
              "SendQueueCapacity": "100",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "0"
            },
            {
              "ID": 35,
              "SendQueueCapacity": "2",
              "SendQueueSize": "0",
              "Priority": "1",
              "RecentlySent": "0"
            },
            {
              "ID": 56,
              "SendQueueCapacity": "1",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "0"
            },
            {
              "ID": 0,
              "SendQueueCapacity": "10",
              "SendQueueSize": "0",
              "Priority": "1",
              "RecentlySent": "0"
            }
          ]
        },
        "remote_ip": "139.99.124.225"
      }, ......
    ]
  }
}
```

#### /health
* curl tcp@localhost:26657/health | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {}
}
```

#### curl tcp@localhost:26657/validators?height= | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "block_height": "1",
    "validators": [
      {
        "address": "000001E443FD237E4B616E2FA69DF4EE3D49A94F",
        "pub_key": {
          "type": "tendermint/PubKeyEd25519",
          "value": "9tK9IT+FPdf2qm+5c2qaxi10sWP+3erWTKgftn2PaQM="
        },
        "voting_power": "250353",
        "proposer_priority": "250353"
      }, ......
    ]
  }
}
```


#### /block
* curl http://localhost:26657/block?height=1000000 | jq
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "block_meta": {
      "block_id": {
        "hash": "F529DFF0E1F5B14C661ABEB1F797D78651E273A9AB4F32A8A6BA4FA70B6DD54B",
        "parts": {
          "total": "1",
          "hash": "F553362E7E06ABF6AB65FC1B934EA4DB5E1BEC0186913A0AA8A460DC3A684F26"
        }
      },
      "header": {
        "version": {
          "block": "10",
          "app": "0"
        },
        "chain_id": "cosmoshub-2",
        "height": "1000000",
        "time": "2019-07-11T10:46:37.047144256Z",
        "num_txs": "1",
        "total_txs": "278873",
        "last_block_id": {
          "hash": "121292ADFC480B744C2684971A597744EE551DE4E464AA81D2047A21DC30422F",
          "parts": {
            "total": "1",
            "hash": "A15F72351D7D4ABCDF4060F91DD8D680B0039CED42D768660B01B8BDADFFDF71"
          }
        },
        "last_commit_hash": "7AFAE1AC96AB0E6719490F9C4F240D1D7F090C0CAE33C7368DAD8A7AD9AA811E",
        "data_hash": "30D30379FF90B9C2A93F99B110EF695FE1FC086680D4A95F57A93E33B0EC1941",
        "validators_hash": "666994144FE9BA68834649B4D3EAB9BA54769C2C8C327E59E4C7BA0F07F0AA6A",
        "next_validators_hash": "666994144FE9BA68834649B4D3EAB9BA54769C2C8C327E59E4C7BA0F07F0AA6A",
        "consensus_hash": "0F2908883A105C793B74495EB7D6DF2EEA479ED7FC9349206A65CB0F9987A0B8",
        "app_hash": "6BA27FBF946360A3B6F37C9A9FB052D7C2449BC25A12A5C80C8F8B99B6F841D4",
        "last_results_hash": "",
        "evidence_hash": "",
        "proposer_address": "75DAB316F4CA1367F532AB71A80B7FA65AB69039"
      }
    },
    "block": {
      "data": {
        "txs": [
          "kwPwYl3uCkKoo2GaChTotJrjSu2+kvfLLjvb/9sAFDXRcBIUzeyf+D37h305V7jURI0DAeWVo5gaEAoFdWF0b20SBzEwMDAwMDASEwoNCgV1YXRvbRIENTAwMBDAmgwaagom61rphyEDI+doT14EF2wwkZjdlDv9UO6sWpaeI2K9QbHhowVtXdcSQPx5mY/ehW1LEvjI61OlCME2ayNssY9pQhnNFJEUhmauSbQgUO9A7uVwJoOIwU7w1JKine4LD57qS+E5lTKE4sMixwFJbiBjZWxlYnJhdGlvbiBvZiB0aGUgMSwwMDAsMDAwdGggQ29zbW9zIEh1YiAyIGJsb2NrLCB3ZSBleHByZXNzIG91ciBncmF0aXR1ZGUgdG8gQWRyaWFuYSBAYWRyaWFuYV9rYWxwYSBmb3IgaGVyIGNvbW11bml0eSBzdXBwb3J0LiBodHRwczovL2lwZnMuaW8vaXBmcy9RbVNjckV4a1JLbnhOV29kdUtvMW9aVnVhRUI0VzZtWVBCR0dMSHdCOXlaRjU0"
        ]
      }
    }
  }
}
```

#### get transactions from tx hash 
* https://cosmos.chorus.one:26657/tx?hash=0xA944DFD8A0DC40E5F1D329533D6D46B0A5024FACD98312BBC73555FD1CF69D83
```
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "hash": "A944DFD8A0DC40E5F1D329533D6D46B0A5024FACD98312BBC73555FD1CF69D83",
    "height": "1481481",
    "index": 0,
    "tx_result": {
      "log": "[{\"msg_index\":\"0\",\"success\":true,\"log\":\"\"}]",
      "gasWanted": "100000",
      "gasUsed": "28691",
      "tags": [
        {
          "key": "YWN0aW9u",
          "value": "c2VuZA=="
        },
        {
          "key": "c2VuZGVy",
          "value": "Y29zbW9zMW55bm5zOGV4OWZxNnNqamZqOGs3OXlta2R6NHNxdGgwNnhleGFl"
        },
        {
          "key": "cmVjaXBpZW50",
          "value": "Y29zbW9zMXpsOGRzNHJ3MGFmMmw2NDd5YzBrazBxNXVkanNoaGxuYzYyY2Zn"
        }
      ]
    },
    "tx": "9QHwYl3uCkKoo2GaChSZJzgfJipBqEpJke3ik3ZoqwAu7xIUF87YVG5/Uq/qviYfazwU42UL3/MaEAoFdWF0b20SBzQ3NzU0MjASEAoKCgV1YXRvbRIBMRCgjQYaagom61rphyEDhmX++MzcN7Nn6Q7OiZyGifpCJfw48u4/YKY3+d2WxHoSQHhm5W7cW5s5mEfgVb7YUTZhDWM9+Y7w2i2twPKc2N/KDTheT5+xlRMnJFrAQWlkhnR3SIzS8aKgEq8vU/8ag5kiLWNvc21vczF6bDhkczRydzBhZjJsNjQ3eWMwa2swcTV1ZGpzaGhsbmM2MmNmZw=="
  }
}
```

