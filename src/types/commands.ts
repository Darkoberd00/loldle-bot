import type {
	AutocompleteInteraction,
	Awaitable,
	ChatInputCommandInteraction,
	Client,
	SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import type { LoggerFunction } from "./Logger";

export interface CommandProps {
	interaction: ChatInputCommandInteraction;
	client: Client;
	log: LoggerFunction;
}

export interface CommandAutocompleteProps {
	interaction: AutocompleteInteraction;
	client: Client;
	log: LoggerFunction;
}

export type CommandExec = (props: CommandProps) => Awaitable<unknown>;
export type CommandAutocompleteExec = (
	props: CommandAutocompleteProps,
) => Awaitable<unknown>;
export type CommandMeta =
	| Promise<SlashCommandBuilder>
	| Promise<Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">>
  | Promise<SlashCommandOptionsOnlyBuilder>;
export interface Command {
	meta: CommandMeta;
	exec: CommandExec;
	autocomplete?: CommandAutocompleteExec;
}

export interface CommandCategoryExtra {
	description?: string;
	emoji?: string;
}

export interface CommandCategory extends CommandCategoryExtra {
  name: string;
  commands: Command[];
}