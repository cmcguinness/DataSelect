
import { LightningElement, track,  api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

/**
 * DataSelect
 * 
 * An OmniScript LWC to support a more flexible sort of data for a combobox
 * 
 * See: https://github.com/cmcguinness/DataSelect for details and license
 * 
 * This implements a Filter pattern, where the options indicate the source of
 * the data and the "value" of the element is the value of the item selected.
 * 
 * Note that the value does not need to be a string, it can be a dictionary
 * or an array.  The labels, however, should be strings.
 * 
 * Note that we do not push the values into the HTML; rather, the values
 * there are indexes into our values.  That's to support complex values.
 */
export default class DataSelect extends OmniscriptBaseMixin(LightningElement)  {

    // I appreciate that @track is unnecessary, but it's nice documentation
    @track cb_label = "";
    @track cb_value = "";
    @track cb_placeholder = "";
    @track cb_options = [];

    _label_data = null;
    _label_path = null;
    _value_data = null;
    _value_path = null;

    /**
     * 
     * process_inputs
     * 
     * Because we don't know the order in which the setters will be called for the options,
     * we need to be prepared to rebuild the combobox as we get more options.  This code
     * does that.
     */
    process_inputs() {
        if (this._label_data == null) {
            return;                             // I know nothing!
        }
        
        this.cb_options = [];

        for (let i=0;i<this._label_data.length;i++) {
            if (this._label_path == null) {
                this.cb_options.push({label: this._label_data[i], value: i.toString()});
            } else {
                this.cb_options.push({label: this._label_data[i][this._label_path], value: i.toString()});
            }
        }

    }


    // Placeholder text...
    @api
        get placeholder() {
            return this.cb_placeholder;
        }
        set placeholder(val) {
            this.cb_placeholder = val;
        }



    @api 
        get label_data() {
            return this._label_data;
        }
        set label_data(data) {
            this._label_data = data;
            this.process_inputs();
        }


    @api 
        get label_path() {
            return this._label_path;
        }
        set label_path(data) {
            this._label_path = data;
            this.process_inputs();
        }

    @api 
        get value_data() {
            return this._value_data;
        }
        set value_data(data) {
            this._value_data = data;
    }

    @api 
        get value_path() {
            return this._value_path;
        }
        set value_path(data) {
            this._value_path = data;
    }


    connectedCallback() {
        this.cb_label = this.omniJsonDef.propSetMap.label;
    }

    selectChange(event) {

        // console.log('In selectChange('+ (event.detail.value.toString())+ ')');
        this.cb_value = event.detail.value;

        let selected = event.detail.value;
        if (selected == "") {
            this.omniUpdateDataJson("");
            return;
        }

        selected = parseInt(selected);

        let values = this._label_data;
        let value_path = this._label_path

        if (this._value_data != null) {
            values = this._value_data;
            value_path = null;
        }

        // Can have a value path that's into the label_data
        if (this._value_path != null) {
            value_path = this._value_path;
        }

        if (value_path == null) {
            this.omniUpdateDataJson(values[selected]);
        } else {
            this.omniUpdateDataJson(values[selected][value_path]);
        }
    }


}