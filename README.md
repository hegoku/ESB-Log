Please chanage JQuery path in index.html

```
       readLayout
           |
    readVariableName
           |
          / \
         /end\
      Y /\   /\ N
       /  \ /  \
     end      / \
             /occ\
          Y /\ ur/\ N
           /  \ /  \
      readTimes  readType
         /           \
  readTimesValue    / \
       /           /val\
      end       N /\ ue/\ Y
                 /  \ /  \
                end   readValue
                           \
                    readValueValue
                             \
                             end
```

##Existing issues

1. 如果数组的定义没有写TIMES关键字就会停止解析. 如 `06 TSERR-MESSAGE-GROUP             OCCURS 14.`


##Change log

###v0.1

Fix type 9 phrase issue.

Before fix, a field which definded as `PIC S9(15)V9(3)` and the data is `000000001993268.39{` will be phrase as `-000000001993268.39{`.

And now it will be phrased as `000000001993268.390`.

原因是如果数据是有符号数字,那么 `000000001993268.39{` 的最后一位 `{` 在EBCDIC编码里包含了最后一位数字和符号位. `{` 对应的EBCDIC码为  `C0`, `C` 说明是如果第一位是C则是正数,如果是D则是负数,而第二位就是原数据的最后一位数字.

如 `000000000074645.60B` 最后一位 `B` 的EBCDIC码为 `C2`, 则原数据是正数且最后一位数字是2. `000000000002375.00}` 最后一位 `}` 的EBCDIC码为 `D0`, 则原数据是负数且最后一位数字是0.
