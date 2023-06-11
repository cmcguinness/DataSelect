# DataSelect
An OmniScript LWC to support a more flexible sort of data for a combobox

This is a custom LWC that supports a couple useful things:

- It allows you to use data already in the OmniScript (in the Data JSON) as the source of labels for the dropdown.
- It allows you to have the values of the dropdown be complex JavaScript objects instead of just strings.



All inputs to the LWC are passed as properties.  The properties are:

| Key         | Required? | Description                                                  |
| ----------- | --------- | ------------------------------------------------------------ |
| label_data  | Y         | The labels to show the user, passed in via the %parent:child% syntax used in OmniScript |
| label_path  | N         | If `label_data` is not an array of strings, but an array of dictionaries (e.g., [ {...}, {...}, ...]), `label_path` indicates what element of the dictionary holds the labels. |
| value_data  | N         | If not present, selection returns values from `label_data`.  If `value_data` is present, then it indicates an array of values to use instead. |
| value_path  | N         | If present, it is assumed that `value_data` (or `label_data`, if there is no `value_data`) is an array of dictionaries, ahd the value of the DataSelect comes from the `value_path` member of the selected dictionary. |
| placeholder | N         | A value to display before any selection has been made.       |

The specification of both _data and _path can seem confusing.  A simple example might help explain.

Suppose you hvae a Data Raptor which returned a list of contacts:

````json
{
    "contacts": [
        {
            "Label": "Edward Stamos, President and CEO",
            "Id": "11111"
        },
        {
            "Label": "Leanne Tomlin, VP Customer Support",
            "Id": "22222"
        },
        {
            "Label": "Howard Jones, Buyer",
            "Id": "33333"
        },
        {
            "Label": "Jeff Smith, VP of Marketing",
            "Id": "44444"
        }
    ]
}
````

Further suppose you want to show Label to the user, but have the value of the element be the Id.  This is how you would configure it:

| Key        | Value      |
| ---------- | ---------- |
| label_data | %contacts% |
| label_path | Label      |
| value_path | Id         |

## Installation

Create a new LWC in Visual Studio Code and drop the .js, .html, and .xml files onto it.

Note that you may or may not need a *NS* specifier in the XML file. See [this documentation](https://help.salesforce.com/s/articleView?id=sf.os_create_a_custom_lightning_web_component_for_omniscript.htm&type=5) if you're unclear.
