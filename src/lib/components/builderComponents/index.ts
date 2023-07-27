//This file imports all the components and exports them as a single object as the default export
// This does not use the __svelteComponent__ suffix to make it easier to read

import FormForm from "./Modals/CreateComponents/Forms/FormForm.svelte";
import InfoForm from "./Modals/CreateComponents/Forms/InfoForm.svelte";
import TableForm from "./Modals/CreateComponents/Forms/TableForm.svelte";
import CreateComponentModal from "./Modals/CreateComponents/CreateComponentModal.svelte";

import CreateProjectModal from "./Modals/CreateProjectModal.svelte";
import DeleteComponentModal from "./Modals/DeleteComponentModal.svelte";
import DeleteProjectModal from "./Modals/DeleteProjectModal.svelte";
import UpdateProjectModal from "./Modals/UpdateProjectModal.svelte";

import AddComponentButton from "./Projects/AddComponentButton.svelte";
import ProjectCard from "./Projects/ProjectCard.svelte";
import ComponentList from "./Projects/ComponentList.svelte";
import EditComponentList from "./Projects/EditComponentList.svelte";

export {
    FormForm,
    InfoForm,
    TableForm,
    CreateComponentModal,
    CreateProjectModal,
    DeleteComponentModal,
    DeleteProjectModal,
    UpdateProjectModal,
    AddComponentButton,
    ProjectCard,
    ComponentList,
    EditComponentList
}


