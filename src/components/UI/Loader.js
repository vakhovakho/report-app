import { Dimmer, Loader as SemanticLoader } from "semantic-ui-react";

export default function Loader() {
    return (
        <Dimmer active inverted>
            <SemanticLoader size='large'>Loading</SemanticLoader>
        </Dimmer>
    )
}