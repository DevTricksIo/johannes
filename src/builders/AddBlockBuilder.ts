import { AddBlockButton } from "@/components/add-block/AddBlockButton";
import { AddBlockWrapper } from "@/components/add-block/AddBlockWrapper";
import { Sizes } from "@/common/Sizes";
import { SVGIcon } from "@/components/common/SVGIcon";

import { Icons } from "@/common/Icons";

export class AddBlockBuilder {

    
    static build(): AddBlockWrapper {
        return AddBlockWrapper.create(AddBlockButton.create(SVGIcon.create(Icons.Plus, Sizes.medium)));
    }
}