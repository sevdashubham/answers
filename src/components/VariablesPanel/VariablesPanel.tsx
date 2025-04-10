import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Drawer } from "vaul";
import SearchBar from "./SearchBar";
import VariableCategory from "./VariableCategory";
import VariableItem from "./VariableItem";
import VariableDetails from "./VariableDetails";
import VariableAccordion from "./VariableAccordion";
import {
  searchTermAtom,
  selectedVariableAtom,
  selectedVariableDataAtom,
  filteredVariablesAtom,
  toggleVariableSelectionAtom,
  updateVariableSectionAtom,
} from "@/atoms/variablesAtoms";
import { isVariableEditorOpenAtom } from "@/atoms/dashboardAtoms";

interface VariablesPanelProps {
  onRerun?: () => void;
  onAutofill?: () => void;
}

const VariablesPanel: React.FC<VariablesPanelProps> = ({
  onRerun,
  onAutofill,
}) => {
  // Global state
  const [isOpen, setIsOpen] = useAtom(isVariableEditorOpenAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [selectedVarId, setSelectedVarId] = useAtom(selectedVariableAtom);
  const selectedVariable = useAtomValue(selectedVariableDataAtom);
  const filteredVars = useAtomValue(filteredVariablesAtom);

  // Actions
  const toggleVariableSelection = useSetAtom(toggleVariableSelectionAtom);
  const updateVariableSection = useSetAtom(updateVariableSectionAtom);

  // Handle close
  const handleClose = () => {
    setIsOpen(false);
    // Reset other state when closed
    setSelectedVarId(null);
    setSearchTerm("");
  };

  // Handle rerun (close panel and trigger callback)
  const handleRerun = () => {
    handleClose();
    if (onRerun) onRerun();
  };

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="right"
      shouldScaleBackground={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-[#1E1E1E] bg-opacity-75 backdrop-blur-[1px] z-40" />
        <Drawer.Content className="fixed inset-y-0 border-l border-[#525252] right-0 w-[45%] bg-[#1E1E1E] shadow-xl flex flex-col z-50">
          {/* Header with close button */}
          <div className="px-6 py-4 mt-9 flex justify-between items-center">
            <h2 className="text-xl font-medium text-white">Edit Variables</h2>
            <button
              className="text-gray-400 hover:text-white"
              onClick={handleClose}
              aria-label="Close panel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search and action buttons */}
          <div className="px-4 py-2 flex space-x-2">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search"
            />
            <button
              className="py-2 px-[20px] bg-gray-700 text-white rounded-md flex items-center"
              onClick={onAutofill}
            >
              <span className="mr-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7273 0L13.6964 2.25L11.4545 3.27273L13.6964 4.30364L14.7273 6.54545L15.75 4.30364L18 3.27273L15.75 2.25M6.54545 2.45455L4.5 6.95455L0 9L4.5 11.0455L6.54545 15.5455L8.59091 11.0455L13.0909 9L8.59091 6.95455M14.7273 11.4545L13.6964 13.6964L11.4545 14.7273L13.6964 15.75L14.7273 18L15.75 15.75L18 14.7273L15.75 13.6964"
                    fill="#B9B9B9"
                  />
                </svg>
              </span>
              Autofill
            </button>
            {/* Layer 1 */}
            <button
              className="relative px-[20px] py-2 rounded-[8px] flex items-center text-[#C9FF3B] overflow-hidden"
              onClick={handleRerun}
              style={{
                border: "2px solid #577113",
                background: "linear-gradient(to bottom, #C8E972, #23291E)",
                outline: "1px solid #23291E",
                outlineOffset: "-1px",
              }}
            >
              {/* Layer 2: Gradient background */}
              <div
                style={{
                  position: "absolute",
                  top: "1px",
                  bottom: "1px",
                  left: "1px",
                  right: "1px",
                  borderRadius: "6px",
                  background: "#23291E",
                  outline: "1px solid #23291E",
                  outlineOffset: "-1px",
                  zIndex: 0,
                }}
              />

              <span className="mr-2 relative z-10">
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.666748 8C0.666748 12.1417 4.02508 15.5 8.16675 15.5C10.1584 15.5 12.0667 14.7167 13.5001 13.3333L12.2501 12.0833C11.1917 13.2083 9.71675 13.8333 8.16675 13.8333C2.96675 13.8333 0.366748 7.55 4.04175 3.875C7.71675 0.2 14.0001 2.80833 14.0001 8H11.5001L14.8334 11.3333H14.9167L18.1667 8H15.6667C15.6667 3.85833 12.3084 0.5 8.16675 0.5C4.02508 0.5 0.666748 3.85833 0.666748 8Z"
                    fill="#C9FF3B"
                  />
                </svg>
              </span>
              <span className="relative z-10">Rerun</span>
            </button>
          </div>

          {/* Main content - scrollable area */}
          <div className="flex-1 overflow-y-auto">
            {/* Variable categories */}
            <div className="p-4">
              {filteredVars.categories.map((category) => (
                <VariableCategory key={category.id} title={category.title}>
                  <div className="flex flex-wrap gap-2">
                    {category.variables.map((variable) => (
                      <VariableItem
                        key={variable.id}
                        name={variable.name}
                        selected={variable.selected}
                        isActive={selectedVarId === variable.id}
                        onClick={() => setSelectedVarId(variable.id)}
                        onToggle={() => toggleVariableSelection(variable.id)}
                      />
                    ))}
                  </div>
                </VariableCategory>
              ))}
            </div>

            {/* Variable details section */}
            {selectedVariable && (
              <div className="border-t border-gray-700 p-4">
                <VariableDetails
                  title={selectedVariable.name}
                  description={selectedVariable.description}
                />
              </div>
            )}

            {/* Accordions for Primary/Secondary Variables */}
            <div className="px-4 pb-4">
              <VariableAccordionWithContent
                title="Primary Variables"
                sectionType="primary"
              />
              <VariableAccordionWithContent
                title="Secondary Variables"
                sectionType="secondary"
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

// Helper component to display variables in accordion
interface VariableAccordionWithContentProps {
  title: string;
  sectionType: "primary" | "secondary";
}

const VariableAccordionWithContent: React.FC<
  VariableAccordionWithContentProps
> = ({ title, sectionType }) => {
  // Same implementation as before
  const variables = useAtomValue(filteredVariablesAtom);
  const [selectedVarId, setSelectedVarId] = useAtom(selectedVariableAtom);
  const toggleVariableSelection = useSetAtom(toggleVariableSelectionAtom);
  const updateVariableSection = useSetAtom(updateVariableSectionAtom);

  const sectionVarIds =
    sectionType === "primary"
      ? variables.primaryVariables
      : variables.secondaryVariables;

  const sectionVariables = sectionVarIds
    .map((id) => {
      for (const category of variables.categories) {
        const found = category.variables.find((v) => v.id === id);
        if (found) return found;
      }
      return null;
    })
    .filter(Boolean);

  return (
    <VariableAccordion title={title}>
      {sectionVariables.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {sectionVariables.map(
            (variable) =>
              variable && (
                <VariableItem
                  key={variable.id}
                  name={variable.name}
                  selected={variable.selected}
                  isActive={selectedVarId === variable.id}
                  onClick={() => setSelectedVarId(variable.id)}
                  onToggle={() => toggleVariableSelection(variable.id)}
                  onRemove={() =>
                    updateVariableSection({
                      variableId: variable.id,
                      section: null,
                    })
                  }
                />
              )
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No variables in this section</p>
      )}
    </VariableAccordion>
  );
};

export default VariablesPanel;
