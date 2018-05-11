import * as React from "react";

export interface ButtonProps {
  value?: string;
  onClick?: React.FormEventHandler<any>;
}

export class Button extends React.Component<ButtonProps, any> {
  constructor(props: ButtonProps) {
    super(props);
  }
  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };
  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}
