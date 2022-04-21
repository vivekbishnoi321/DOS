import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { connect } from "react-redux";
import { FixedSizeList as List } from "react-window";

import { ramTitlesSelector } from "../selectors";
class RamList extends React.Component {
  static propTypes = {
    rams: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    handleChange: PropTypes.func
  };

  render() {
    return (
      <Downshift onChange={this.props.handleChange}>
        {({
          getLabelProps,
          getInputProps,
          getMenuProps,
          getItemProps,
          inputValue,
          isOpen
        }) => (
          <div>
            <label {...getLabelProps()}>{this.props.label}: </label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? (() => {
                    const items = this.props.rams.filter(
                      item => !inputValue || item.includes(inputValue)
                    );
                    return (
                      <List
                        height={150}
                        itemCount={items.length}
                        itemData={items}
                        itemSize={35}
                        width={300}
                      >
                        {({ data, index, style }) => {
                          const item = data[index];
                          return (
                            <li
                              {...getItemProps({ key: item, item })}
                              style={style}
                            >
                              {item}
                            </li>
                          );
                        }}
                      </List>
                    );
                  })()
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}

const mapStateToProps = state => ({
  rams: ramTitlesSelector(state)
});

export default connect(mapStateToProps)(RamList);
